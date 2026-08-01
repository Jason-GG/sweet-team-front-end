import { AlertTriangle, ArrowLeft, Home } from 'lucide-react'
import { isRouteErrorResponse, Link, useNavigate, useRouteError } from 'react-router-dom'

function ErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError()

  const isNotFound = isRouteErrorResponse(error) && error.status === 404
  const statusLabel = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : 'Unexpected route error'
  const title = isNotFound ? 'Page not found' : 'Something went wrong'
  const message = isNotFound
    ? 'The page you requested does not exist or may have been moved.'
    : 'The page could not be loaded. Try going back or return to the home page.'

  return (
    <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#fcf8fd_0%,#f8f4fb_100%)] px-4 py-10">
      <section className="w-full max-w-2xl rounded-[28px] border border-[#eadff0] bg-white p-8 shadow-[0_18px_40px_rgba(84,63,112,0.12)] sm:p-10">
        <div className="inline-flex rounded-full bg-rose-100 p-3 text-rose-700">
          <AlertTriangle className="size-5" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-rose-700">
          {statusLabel}
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-[-0.03em] text-[#283042] sm:text-5xl">
          {title}
        </h1>

        <p className="mt-4 max-w-xl text-base leading-7 text-[#677083]">{message}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-full border border-[#e3d9ec] bg-white px-5 py-3 text-sm font-semibold text-[#4d5565] transition-colors hover:bg-[#faf7fc]"
          >
            <ArrowLeft className="size-4" />
            Go back
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#a85cf5] to-[#f04fa3] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_22px_rgba(206,95,214,0.28)]"
          >
            <Home className="size-4" />
            Return home
          </Link>
        </div>

        <div className="mt-8 rounded-2xl border border-[#efe7f3] bg-[#fbf8fd] px-5 py-4 text-sm text-[#6a7282]">
          If this keeps happening, check the route configuration in the app router or confirm the requested URL is valid.
        </div>
      </section>
    </main>
  )
}

export default ErrorPage