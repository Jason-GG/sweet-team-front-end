import { BookOpen, Lightbulb, Smartphone, TriangleAlert } from 'lucide-react'

function GuidePage() {
  return (
    <div className="mx-auto max-w-5xl space-y-5 lg:space-y-6">
      <section className="overflow-hidden rounded-[28px] bg-gradient-to-r from-[#28c85e] via-[#31b6a6] to-[#4b7ef7] p-7 text-white shadow-[0_22px_40px_rgba(63,125,194,0.22)] sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-extrabold tracking-[-0.02em] sm:text-[2.25rem]">
              Your Knowledge Collection
            </h1>
            <p className="mt-3 text-base font-medium text-white/82 sm:text-[1.35rem] sm:leading-8">
              The little facts I learned by logging in accumulate every day.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/18 px-4 py-2 text-sm font-semibold text-white/92 backdrop-blur-sm">
              <BookOpen className="size-4" />
              <span>so far 0 I learned individual knowledge.</span>
            </div>
          </div>

          <div className="flex h-18 w-18 shrink-0 items-center justify-center self-end rounded-full bg-white/18 text-4xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-sm sm:h-20 sm:w-20 sm:self-start">
            <span aria-hidden="true">📚</span>
          </div>
        </div>
      </section>

      <section className="rounded-[20px] border border-[#efd37f] bg-[#fff8df] px-5 py-4 text-[#b96a1e] shadow-[0_10px_24px_rgba(204,151,65,0.12)] sm:px-6">
        <div className="flex items-start gap-3">
          <TriangleAlert className="mt-0.5 size-5 shrink-0 text-[#f39a2e]" />
          <div>
            <h2 className="text-base font-extrabold">Important Announcements</h2>
            <p className="mt-1 text-sm font-medium leading-6 text-[#be6d23] sm:text-[0.96rem]">
              The information provided here is provided as general knowledge. Be sure to consult
              your doctor about any changes to your prescribed medication or treatment methods.
              In case of emergency, please seek medical attention promptly.,
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border-2 border-dashed border-[#e7dce8] bg-white/92 px-6 py-12 shadow-[0_18px_34px_rgba(106,84,131,0.08)] sm:px-10 sm:py-14">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-[#cfd4de]">
            <Smartphone className="size-12 stroke-[1.3]" />
          </div>

          <h2 className="mt-5 text-[2rem] font-extrabold tracking-[-0.03em] text-[#3a4251]">
            No trivia yet.
          </h2>
          <p className="mt-3 text-lg font-medium text-[#6d7485]">
            Log in daily to get new trivia added here
          </p>

          <div className="mt-6 inline-flex max-w-full items-center justify-center gap-2 rounded-2xl bg-[#fdf0f4] px-5 py-3 text-sm font-semibold text-[#687088] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:min-w-[360px]">
            <Lightbulb className="size-4 shrink-0 text-[#f0c857]" />
            <span>Log in again tomorrow and collect your first trivia!</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GuidePage