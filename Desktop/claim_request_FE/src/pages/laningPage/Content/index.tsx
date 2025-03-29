import React from "react";

type FeatureCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  altText: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  imageSrc,
  altText,
}) => {
  return (
    <div className="overflow-hidden rounded-xl bg-[#3a3f5e] text-left shadow-md transition duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl">
      <div className="flex h-[200px] items-center justify-center bg-white p-6">
        <img
          src={imageSrc}
          alt={altText}
          className="block max-h-full max-w-full object-contain"
        />
      </div>
      <div className="p-6">
        <h3 className="m-0 mb-2 text-xl font-bold">{title}</h3>

        <p className="text-sm leading-relaxed text-[#ced4da]">{description}</p>
      </div>
    </div>
  );
};

export default function Content() {
  const features = [
    {
      title: "User Authentication",
      description:
        "Ensure that users are logged in or authenticated to submit claim requests.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/b522/7561/772e70f317690e8bfd4b899f66bcf0c6?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=okY5vQNQbNbWrPfOjtj1cRmsAvmo7afQ3diQdYqEF2qCupo9~pU9wPh8Ev3fQ8sFM21Az~c83Sia4nwC7v9x~Lx3K1r34XiAXn1w~EpuxBHuWdm4l8qS1v42EL8Kh3EmJEO7t7ZhFyCJck3HSbEx9aAzb5LSeuoE2esjWsPr7BUF1tVnTSKsqkg61LVmPXbww~0sjjtAjZO2tYf0xjqchGHucWD8xHHni34qWuxctcwARc2yseauDjoMWvmZNByeBn7bynCOPZwu-9fuVqz~hOO--NRUzX2JUxugVtG~V3h1ZJYRtQuq8C8KdZeBoqYlKtwonEALOdFEj9D71YimBA__",
      altText: "Illustration for User Authentication",
    },
    {
      title: "Real-time Tracking",
      description: "Employees can check their claim status anytime.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/27ef/0d83/a2f147ee018077e6a64f84b504606edb?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=enAvcvpcjKvTt3hEPQqKJqk60n9csXXFuMBXhV~L7nq8w8D9MVEP6-~UYi~NhYAcNime~pW3~cH3xoXQfOl3~2A1lp7GAr0jRs5OqZx~15AwUiYX8naoeC8Dq02WY2xgWkvweXhkER9F1TFL1RmZIOPNoTjhtPLVY~NDHX~unSg9gq1vXzFZxQldsxvpoBUSxZEaNfausg6acEIUL9c1f2S9K2l7pUW9uYmOxHccDbYT4kXT1KRV6QVHPjJ-mdeF5xJDH9jAyGQD~eg0WPznqZAvF65uadkFS3~vaOCY-n9cu6w1gnX5ctKYnggt59oG6jeX0DsFa5XNo14PLZLSnw__",
      altText: "Illustration for Real-time Tracking",
    },
    {
      title: "Claim Submission Form",
      description: "Provide a detailed form for users to submit their claim.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/2d1b/164a/260e6da6e7b9eb01a34ac3953382cc50?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=OizzY4VqtXZAL1TtQYetsdYGMYq9BiIJbdpAGuCT5bj1~DkUD4zGLGHyhZtU6uLchXQ5JCaY6Ytq6VV8gU32DSM9rEJNmuagDmXe07DUXuznCmD2~M55eULKTLcEz8AExLeTs29ILvL0oZbQYgABj8DA96xdpEj73--JUTScmbCQSvW~LGxtqN38D8Z5hMNpm0klMsrOd0OcUQ2VVHZEesZQdTVE8kKyqth4CluvfeUnyxR2vG3bJND3D6AozGBNkXdtF1795WJdanSv61tT~Tmo1q4z84CGGyxRgRBnYGLpmQIthnhvqxKKCTGiPNSuaGvg2Odd4~V7Q-BEEpoOMw__",
      altText: "Illustration for Claim Submission Form",
    },
    {
      title: "Multi-Level Approval Workflow",
      description:
        "Include approval processes where claims need to go through different levels of review.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/5285/9553/aebe8607ad85a965578f8f0f88238c9c?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=o64QS83uiSqnB4h~61uYZ4dzLbIEkNY6hjFiuSEZQGT16kp9LHzpSjGjYSYF4abOuqahKjsCLHw6SQ~Eh4DAX7s7yB1dpM5nRr-pAEMvXcanqhe-I4voQ8NNM9Fp8Xo1kIMXXh-Pqo5YV0w~36p21qNJZCARc1kw1Enw7blh3M5B5a1~FT673TQZdI51AnzL7mMjsPoLibynn60CH3Tx9K~Eg~SE6btm6wmZzXPDkMiXAPJOnTvjEk8q8BGrTjnOUQsbgQUW81GL60DEp6tXxyjh8unGi9vC9axl9OhRUPoXgF6TGdBmO~jMI7nhgTh9Aek9of-r55pChr-725R7mg__",
      altText: "Illustration for Multi-Level Approval Workflow",
    },
    {
      title: "Automated Notifications",
      description:
        "Send automated email or in-app notifications to users regarding claim status updates.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/7977/dd22/f160639f86428dfb7f8ac8c8f058969a?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ep5eiD7dTBU544NtJmXXPKmSO2yT0Pd6PW4vJXg1A2hNh0lb5pPK1PmXnOfdS-1WXIvoZw23h6-6CpO1PGS~E9FIySh9kkmUGt~DzUbilZ3oXn1NZbt-SjA1amaNASpml05pIILzvgJdkNu7gXZVqtxabayPYda77rJnbikF9~Ei~nwMvI~-gR6Tm4lQFwPgorD3OJVk~B6flaldmkvWqxPUFrqv1~RiY70uHAfw4hivbdGa9taZd~hojY-di9QKrYqL50VBw0W4Wmm3lgyQzoE~-71YM3Lw1F0QmgJcuMgmMgdI2BZpsggaj2LIxsak-18Ah81s98BlDZjFFTKMEw__",
      altText: "Illustration for Automated Notifications",
    },
    {
      title: "Secure & Role-Based Access",
      description: "Ensures that only authorized personnel can manage claims.",
      imageSrc:
        "https://s3-alpha-sig.figma.com/img/aa24/439f/3709e5be7bd698275d7a5cf7cb0601e2?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=gs7f40zJWuv~1ASxnWRfuhq5uhpQtx0cDo4eWUOhLRlv2X7A51HvbdkQZXZiO3nwKsUmhBuqqNWkZz34g9inO7T-2ZlzxUwHrSOBLDJlPUw2y9wBsLfuc1FjC4bc3gJhKQO4NiGM41GKrmEpT-~KbYzo-Qfs6GhZkzYXwgyyVF1c6eIQP6m01g6J980NW2a22G5T2fl7z277hJQeVK2R7xLYFTBI-0vJ153CaJ46wp7LZJG-8xBD3bvh7g1mShn6od3Egrj5i5kwNbpl-sA0DUrpMV5LhmTNx-0LZo8nJYnwlpTnyVi-s3D~qV-drV6zz2ov0z-mdFn4X4m5X0DJBg__",
      altText: "Illustration for Secure & Role-Based Access",
    },
  ];

  return (
    <>
      <section
        id="overview"
        className="flex w-full flex-col items-center justify-center overflow-hidden bg-[#2d3142] py-16 text-white"
      >
        <div className="text flex max-w-[800px] flex-col px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold">Overtime Claims Made Easy</h2>
          <p className="mb-6 text-base opacity-90">
            Stop wasting time with inefficient, error-prone manual overtime
            claims. ClaimEasy provides a simple, transparent platform for
            employees to submit requests and managers to approve them quickly.
          </p>
          <p>
            Streamline your workflow and ensure everyone is on the same page.
          </p>
        </div>
      </section>
      <section
        id="feature"
        className="w-full overflow-hidden bg-[#2d3142] py-16 text-white"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="mb-10 text-center text-4xl font-bold">Features</h2>{" "}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                imageSrc={feature.imageSrc}
                altText={feature.altText}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
