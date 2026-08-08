## Plan: Shared Auth API Layer

Add a small shared HTTP client with a configurable Vite base URL, then add auth-specific API functions for health, request-code, verify-code, and register. Rewire the current Register page to use those functions instead of local placeholder success states, while keeping Login out of scope until a login endpoint exists.

**Steps**
1. Add shared API config and request plumbing in the app layer.
   Use a single base URL sourced from a Vite env variable such as `VITE_API_BASE_URL`, with a fallback like `http://127.0.0.1:8000` for local development.
   Add one reusable request helper that builds `baseUrl + path`, sends JSON bodies, includes credentials for cookie-based flows, normalizes non-2xx responses into a typed error, and returns parsed JSON when present.
2. Add auth endpoint types and feature API wrappers. *depends on 1*
   Create request/response types for health, request-code, verify-code, and register.
   Expose small feature functions such as `getHealth`, `requestVerificationCode`, `verifyVerificationCode`, and `registerAccount` so pages call feature APIs instead of raw fetch.
3. Rework Register page state into a submit-ready form model. *depends on 2*
   Convert the currently uncontrolled profile fields into React state so the register payload can be built from the form.
   Keep the existing UX gates: invalid email blocks code request, code request must succeed before verify, verify must succeed before register, and register stays disabled until email is verified.
4. Replace placeholder handlers on Register with real async calls. *depends on 3*
   `handleSendValidationCode` should call the request-code endpoint and surface loading and error feedback.
   `handleVerifyCode` should call the verify-code endpoint and only mark the email verified on backend success.
   `handleSubmit` should call the register endpoint with the full payload and prevent submission when verification has not completed.
   Preserve or add user-visible pending/error/success messaging around each step.
5. Keep health as a reusable page-level utility, but do not force a UI integration yet. *parallel with 3 once 2 is done*
   Implement the health call in the shared/feature API surface so any page can consume it later.
   Do not add a health widget unless requested; the current ask is the API layer, not new page UI.
6. Document the host override and backend contract. *depends on 1*
   Add a short note to the project docs describing the env var and expected local backend host.
   Call out the backend content type requirement during verification because the provided curls send JSON with `Content-Type: text/plain`; if the backend rejects `application/json`, keep the client override per endpoint instead of changing page code.

**Relevant files**
- `/Users/sjian/Documents/projects/sweet-team-front-end/src/pages/Register/index.tsx` — replace local fake verification/register flow with real async handlers and controlled form state.
- `/Users/sjian/Documents/projects/sweet-team-front-end/src/features/booths/api/boothsApi.ts` — reference existing feature-level API placement pattern.
- `/Users/sjian/Documents/projects/sweet-team-front-end/src/lib/constants.ts` — reference current app-level shared constant organization; likely neighbor for API config if a `lib/api` folder is added.
- `/Users/sjian/Documents/projects/sweet-team-front-end/README.md` — document `VITE_API_BASE_URL` usage and local backend assumption.
- `/Users/sjian/Documents/projects/sweet-team-front-end/package.json` — reference available verification commands only; no dependency additions are required for a fetch-based client.

**Verification**
1. Run the TypeScript production build with `npm run build` to catch request/response typing and form-state integration issues.
2. Run `npm run lint` to catch React handler/state issues on the updated Register page and new API modules.
3. With the backend running on the configured host, manually test this sequence on the Register page: request code with invalid email, request code with valid email, verify with bad code, verify with correct code, register with mismatched/valid payloads.
4. If the backend rejects requests unexpectedly, confirm whether it requires `Content-Type: text/plain` despite JSON payloads and pin that behavior inside the shared client or auth API wrapper.

**Decisions**
- Included: shared host variable, reusable request helper, auth API wrappers, Register page wiring, health endpoint function.
- Excluded: Login submission wiring, token/session management beyond cookie-enabled requests, route redirects after successful register unless explicitly requested.
- Recommended structure: keep endpoint wrappers in a new auth feature area and keep the lower-level fetch helper in a shared app-level location so future pages can reuse it.

**Further Considerations**
1. Success navigation after registration is still unspecified. Recommendation: keep the user on the Register page with a success message for this pass, or redirect to Login if you want a stronger completion flow.
2. Server response shapes are not yet known from the curl examples. Recommendation: start with minimal typed responses and widen only if the backend returns more fields.
3. CSRF handling may be backend-specific. Recommendation: begin with `credentials: 'include'`; only add explicit CSRF header extraction if the backend proves it is required for browser requests.
