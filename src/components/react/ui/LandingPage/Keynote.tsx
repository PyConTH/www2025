import { Icon } from "@iconify/react";
import Heading2 from "@/components/react/ui/LandingPage/Heading2";
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
    image: "https://placehold.co/720x720?text=Alyssa Coghlan",
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
      <div className="md:col-span-3 col-span-4">
        <div
          className="max-xl:h-32 max-xl:w-32 h-42 w-42 mx-auto rounded-full rounded-br-none overflow-hidden p-1"
          style={{ background: color }}
        >
          <div className="h-full w-full mx-auto rounded-full rounded-br-none overflow-hidden">
            <img
              className="w-full"
              width={200}
              height={200}
              src={speaker.image}
              alt={speaker.name}
            />
          </div>
        </div>
      </div>

      <div className="ml-4 inline-block md:col-span-7 col-span-full max-lg:mt-4">
        {/* Content */}

        <div>
          <p className="text-xl font-medium" style={{ color }}>
            {speaker.name}
          </p>

          <div className="mb-1 flex gap-x-2 text-xl items-center">
            {displaySocial()}
          </div>
        </div>

        {/* Session name */}
        {/* <p className="text-xl font-medium">Title</p> */}

        {/* Session description */}
        <div
          onClick={() => setIsShowFullContent(!isShowFullContent)}
          className={`
              ${isShowFullContent ? "overflow-auto" : "overflow-clip"}
                relative transition-all rounded-md group cursor-pointer
              `}
          style={{
            maxHeight: isShowFullContent
              ? contentEL.current?.clientHeight
              : "128px",
          }}
        >
          <p
            ref={contentEL}
            className="font-light relative"
            dangerouslySetInnerHTML={{ __html: speaker.description }}
          ></p>

          {!isShowFullContent && (
            <button
              role="button"
              aria-label="Expand"
              className="bg-black/5 backdrop-blur-md hover:bg-black/25 group-hover:bg-black/25 border-gray-400 border rounded-b-md text-slate-500 absolute bottom-0 left-0 w-full flex justify-center items-center cursor-pointer"
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

  return (
    <div
      id="program"
      className="flex flex-col text-black bg-slate-100 px-8 md:px-16 py-8"
    >
      <Heading2 title="Keynotes" />

      <div className="my-8">
        <div className="grid lg:grid-cols-6 gap-x-4 gap-y-8 mt-8">
          {listKeynote()}
        </div>
      </div>
    </div>
  );
}
