// import { PhotoIcon } from '@heroicons/react/24/solid'

export default function CreateFundraiserPage() {
  return (
    <div className="container px-8 py-24 md:py-28 md:px-16 lg:px-36 relative bg-[url(https://img.freepik.com/free-vector/colorful-hands-background_23-2147508530.jpg?w=740&t=st=1680548379~exp=1680548979~hmac=b9f502e093a6b7ba1a136f82d2d0aeb5622a5454e93e61356109c1a32155ecc1)] bg-cover bg-center bg-no-repeat">
      <form>
        <div className="space-y-12 lg:px-28 lg:py-10 bg-teal-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-80 border-2 border-gray-800 shadow-xl shadow-black">
          <div className="p-8 ">
            <h1 className="text-center font-bold text-4xl pt-8">
              Create a Fundraiser
            </h1>
            <p className="mt-1 text-xl text-center">
              Start a new initiative to help a cause
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-2xl font-medium leading-6 text-black"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                      placeholder="Save Ukraine !"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-2xl font-medium leading-6 text-black"
                >
                  State the cause
                </label>
                <p className="mt-3 text-xl leading-6 text-black">
                  {" "}
                  Why are you starting the fundraiser ?
                </p>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:py-1.5 sm:text-xl sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-2xl font-medium leading-6 text-black"
                >
                  Target amount (in $)
                </label>
                <div className="my-2 pb-8">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      autoComplete="amount"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                      placeholder="60,000"
                    />
                  </div>
                </div>
                <label
                  htmlFor="username"
                  className="block text-2xl font-medium leading-6 text-black"
                >
                  Latest date
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-black focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-800 sm:max-w-md">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      autoComplete="amount"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6"
                      placeholder="60,000"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-2xl font-medium leading-6 text-black"
                >
                  Upload a cover image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-black px-6 py-10">
                  <div className="text-center">
                    <div className="mt-4 flex text-xl leading-6 text-black">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white px-3 font-semibold focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-800 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-black">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            <h2 className="text-2xl font-semibold leading-7 text-black">
              Personal Information
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-xl font-medium leading-6 text-black"
                >
                  Full name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-xl font-medium leading-6 text-black"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-xl font-medium leading-6 text-black"
                >
                  Phone number
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="postal-code"
                    id="postal-code"
                    autoComplete="postal-code"
                    className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-black placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-800 sm:text-xl sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="text-xl font-semibold leading-6">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-800 py-2 px-3 text-xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
