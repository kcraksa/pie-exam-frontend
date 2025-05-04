import Image from "next/image";

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/pie-page?populate[expertize_points]=*&populate[expertize][populate][0]=illustration&populate[seo_properties]=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
      cache: "no-store",
    }
  );
  const { data } = await res.json();

  return (
    <section className="py-16 px-6 lg:px-32 bg-white h-full">
      <div className="text-center mb-10">
        <p className="text-gray-600">{data?.title}</p>
        <h2 className="text-3xl font-bold mt-2">{data?.headline}</h2>
        <p className="text-gray-500 mt-4 mx-auto">{data?.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-10 w-full">
        {/* Left Image & Description */}
        <div className="flex items-center gap-0 relative">
          {/* Left Circle (Text) */}
          <div className="w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] bg-rose-700 opacity-40 rounded-full z-20 flex flex-col justify-center items-start text-white p-4">
            <h3 className="text-lg font-bold mb-2">
              {data?.expertize?.title_of_expertize}
            </h3>
            <p className="text-xs lg:text-sm text-left">
              {data?.expertize?.description}
            </p>
          </div>

          {/* Right Circle (Image) */}
          <div className="-ml-12 w-[200px] h-[200px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px] rounded-full overflow-hidden z-10 shadow-lg">
            <Image
              src={data?.expertize?.illustration?.url}
              alt="Working Woman"
              className="w-full h-full object-cover"
              width={250}
              height={250}
            />
          </div>
        </div>

        {/* Right Buttons */}
        <div className="w-full lg:w-1/2 space-y-4">
          {data?.expertize_points?.map(
            (point: { id: string; point: string }) => (
              <button
                key={point.point}
                className={`w-full flex items-center justify-between px-6 py-4 rounded-full transition-colors bg-gray-300 text-gray-800 hover:bg-rose-700 hover:text-white`}
              >
                <span className="text-xl">&lt;</span>
                <span className="font-semibold">{point.point}</span>
              </button>
            )
          )}
        </div>
      </div>
    </section>
  );
}
