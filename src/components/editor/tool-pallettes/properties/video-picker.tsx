import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightCircleIcon, LinkIcon, PlayCircleIcon } from "lucide-react";

const videos = [
  [
    "https://videos.pexels.com/video-files/6535486/6535486-uhd_2160_4096_30fps.mp4",
    "https://www.pexels.com/@roman-odintsov/",
  ],
  [
    "https://videos.pexels.com/video-files/8604822/8604822-hd_1080_1920_30fps.mp4",
    "https://www.pexels.com/@solodsha/",
  ],
  [
    "https://videos.pexels.com/video-files/4465061/4465061-hd_1920_1080_30fps.mp4",
    "https://www.pexels.com/@karolina-grabowska/",
  ],
  [
    "https://videos.pexels.com/video-files/8608630/8608630-uhd_3840_2160_25fps.mp4",
    "https://www.pexels.com/@tp-motion-74119315/",
  ],
  [
    "https://videos.pexels.com/video-files/12412379/12412379-uhd_3840_2160_30fps.mp4",
    "https://www.pexels.com/@towfiqu-barbhuiya-3440682/  ",
  ],
];

export type VideoPickerProps = {
  onSelect: (url: string) => void;
};

export const VideoPicker = ({ onSelect }: VideoPickerProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="secondary">
            <span className="inline-flex items-center gap-2">
              <LinkIcon size={16} />
              Pick Video
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="pt-4 flex gap-4 flex-wrap items-start">
            {videos.map(([videoURL], index) => (
              <DialogClose asChild key={index}>
                <button
                  className="flex justify-center items-center"
                  onClick={() => {
                    onSelect(videoURL);
                  }}
                >
                  <video
                    className="w-[100px] h-[100px] bg-gray-500  hover:outline outline-gray-700 p-1 rounded-md cursor-pointer"
                    src={videoURL}
                  ></video>
                  <PlayCircleIcon className="absolute text-gray-50 drop-shadow" />
                </button>
              </DialogClose>
            ))}
          </div>
          <hr />
          <details className="text-sm text-gray-500 [&_svg]:open:rotate-90">
            <summary className="cursor-pointer list-none flex items-center gap-2 leading-none text-xs">
              <ArrowRightCircleIcon
                size={12}
                className="rotate-0 transform transition-transform duration-300"
              />
              <div className="flex items-center">
                Creative Commons Attributions
              </div>
            </summary>
            <ol className="list-decimal p-4">
              {videos.map(([, attributionURL], index) => (
                <li key={index}>
                  <a href={attributionURL} className="text-blue-500 underline">
                    Pexels - {attributionURL.split("/")[3]}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </DialogContent>
      </Dialog>
    </div>

    // <div>
    //   <Button onClick={() => setOpen(true)} />
    //   <Dialog open={open}>
    //     <DialogClose onClick={() => setOpen(false)} />
    //     <div className="flex gap-4 flex-wrap items-start">
    //       {videos.map(([videoURL, attributionURL]) => (
    //         <div
    //           style={{
    //             position: "relative",
    //             width: 100,
    //             height: 100,
    //           }}
    //           className="flex justify-center items-end text-center"
    //         >
    //           <video className="h-full absolute" src={videoURL}></video>
    //           <a href={attributionURL} className="text-[8px]">
    //             CC Pexels <br /> {attributionURL.split("/")[3]}
    //           </a>
    //         </div>
    //       ))}
    //     </div>
    //   </Dialog>
    // </div>
  );
};
