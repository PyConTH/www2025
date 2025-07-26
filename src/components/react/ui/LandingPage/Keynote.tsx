import Heading2 from "@/components/react/ui/LandingPage/Heading2";
import { imageBaseUrl } from "@/constants";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";

type Speaker = {
  name: string;
  description: string;
  github?: string;
  twitter?: string;
  position?: string;
  organization?: string;
  image: string;
};

const speakers: Array<Speaker> = [
  {
    name: "Georgi Ker",
    description: `
    "Georgi Ker is the Director and Treasurer of the Python Software Foundation and a passionate advocate for diversity and inclusion. She is also a fellow member and the 2020 Community Service Award recipient.A French citizen born and raised in Singapore, Georgi has lived in Thailand and Indonesia before settling in Amsterdam, the Netherlands. During her time in Thailand, she served as the conference lead for both PyCon APAC and PyCon Thailand. She is currently a co-organizer of PyLadiesCon and chairs the D&I Workgroup within the PSF, continuing her commitment to empowering underrepresented groups in tech"
    `,
    organization: "Python Software Foundation",
    position: "Director and Treasurer",
    // github: "https://github.com/ambv",
    // twitter: "https://twitter.com/llanga",
    image: "/images/speakers/georgi-color.jpg",
  },
  {
    name: "Alyssa Coghlan",
    description: `
    "Alyssa has been a CPython core contributor since 2005, and served on the inaugural Python Steering Council in 2019. She was the default approval delegate for Python packaging interoperability PEPs from 2013 to 2018. She was elected for two terms on the Python Software Foundation Board of Directors (2014-2016), and founded the PyCon Australia Education Seminar in 2015.Professionally, Alyssa's career has spanned high frequency radio communications in the Australian defence sector, automated hardware integration testing infrastructure for Red Hat Enterprise Linux, remote management and monitoring of global EV fast charging systems, and, most recently, enabling local execution of generative AI language models with LM Studio."
    `,
    organization: "PSF Fellow",
    position: "Python deployment engineer at LM Studio",
    // image: "https://placehold.co/720x720?text=Alyssa Coghlan",
    image: "/images/speakers/alyssa-color.jpg",
  },
];

const KeynoteSpeaker = ({
  speaker,
  color,
}: {
  speaker: Speaker;
  color: string;
}) => {
  const [isShowFullContent, setIsShowFullContent] = useState(false);
  const contentEL = useRef<HTMLParagraphElement>(null);

  const displaySocial = () => {
    const socials = [];

    if (speaker.twitter) {
      socials.push(
        <a
          key={speaker.name + "_twitter"}
          href={speaker.twitter}
          target="_blank"
          style={{ color }}
        >
          <Icon icon="uil:twitter" />
        </a>,
      );
    }

    if (speaker.github) {
      socials.push(
        <a
          key={speaker.name + "_github"}
          href={speaker.github}
          target="_blank"
          style={{ color }}
        >
          <Icon icon="uil:github" />
        </a>,
      );
    }

    return socials;
  };

  return (
    <div className="col-span-3 grid grid-cols-10 gap-x-4 gap-y-8">
      <div className="col-span-4 md:col-span-3">
        <div
          className="h-42 w-42 mx-auto overflow-hidden rounded-full rounded-br-none p-1 max-xl:h-32 max-xl:w-32"
          style={{ background: color }}
        >
          <div className="mx-auto aspect-square overflow-hidden rounded-full rounded-br-none">
            <img
              className="w-full"
              width={200}
              height={200}
              src={imageBaseUrl + speaker.image}
              alt={speaker.name}
            />
          </div>
        </div>
      </div>

      <div className="col-span-full ml-4 inline-block max-lg:mt-4 md:col-span-7">
        {/* Content */}

        <div>
          <p className="text-xl font-medium" style={{ color }}>
            {speaker.name}
          </p>

          <div className="mb-1 flex items-center gap-x-2 text-xl">
            {displaySocial()}
          </div>
        </div>

        {/* Session name */}
        {/* <p className="text-xl font-medium">Title</p> */}

        {/* Session description */}
        <div
          onClick={() => setIsShowFullContent(!isShowFullContent)}
          className={` ${isShowFullContent ? "overflow-auto" : "overflow-clip"} group relative cursor-pointer rounded-md transition-all`}
          style={{
            maxHeight: isShowFullContent
              ? contentEL.current?.clientHeight
              : "128px",
          }}
        >
          <p
            ref={contentEL}
            className="relative font-light"
            dangerouslySetInnerHTML={{ __html: speaker.description }}
          ></p>

          {!isShowFullContent && (
            <button
              role="button"
              aria-label="Expand"
              className="absolute bottom-0 left-0 flex w-full cursor-pointer items-center justify-center rounded-b-md border border-gray-400 bg-black/5 text-slate-500 backdrop-blur-md hover:bg-black/25 group-hover:bg-black/25"
            >
              <span className="hidden" aria-hidden="true">
                Read more speaker description
              </span>
              <Icon icon="mingcute:down-fill" className="" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Keynote() {
  const listKeynote = () => {
    const colors = ["#54B0D0", "#60CA86", "#E4613D", "#DF86E3"];

    return speakers.map((speaker, index) => {
      return (
        <KeynoteSpeaker
          key={`speaker-${index}`}
          speaker={speaker}
          color={colors[index % colors.length]}
        />
      );
    });
  };

  // @ts-ignore
  return (
    <div
      id="program"
      className="flex flex-col bg-slate-100 px-8 py-8 text-black md:px-16"
    >
      <Heading2 title="Keynotes" />

      <div className="my-8">
        <div className="mt-8 grid gap-x-4 gap-y-8 lg:grid-cols-6">
          {listKeynote()}
        </div>
        <h3 className="mt-12 text-center text-xl">
          <a href="/speakers" className="text-[#00B4D5] underline">
            AND... MORE SPEAKERS
          </a>
        </h3>
      </div>
    </div>
  );
}
