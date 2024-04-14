import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ArrowRightCircleIcon, LinkIcon } from "lucide-react";

const images = [
  [
    "https://images.pexels.com/photos/6542680/pexels-photo-6542680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.pexels.com/@geraud-pfeiffer/",
  ],
  [
    "https://images.pexels.com/photos/6542652/pexels-photo-6542652.jpeg",
    "https://www.pexels.com/@geraud-pfeiffer/",
  ],
  [
    "https://images.pexels.com/photos/6781374/pexels-photo-6781374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.pexels.com/@introspectivedsgn/",
  ],
  [
    "https://images.pexels.com/photos/7129155/pexels-photo-7129155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.pexels.com/@michael-burrows/",
  ],
  [
    "https://images.pexels.com/photos/6467798/pexels-photo-6467798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.pexels.com/@tamarita/",
  ],
  [
    "https://images.pexels.com/photos/5069203/pexels-photo-5069203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.pexels.com/@shvetsa/",
  ],
  [
    "https://images.pexels.com/photos/4194842/pexels-photo-4194842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.pexels.com/@karolina-grabowska/",
  ],
  [
    "https://images.pexels.com/photos/2748716/pexels-photo-2748716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.pexels.com/@pratikgupta/",
  ],
  [
    "https://images.pexels.com/photos/1028600/pexels-photo-1028600.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://www.pexels.com/@lum3n-44775/",
  ],
];

export type ImagePickerProps = {
  onSelect: (url: string) => void;
};

export const ImagePicker = ({ onSelect }: ImagePickerProps) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="secondary">
            <span className="inline-flex items-center gap-2">
              <LinkIcon size={16} />
              Pick Image
            </span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div className="pt-4 flex gap-4 flex-wrap items-start">
            {images.map(([imageURL], index) => (
              <DialogClose asChild key={index}>
                <button
                  type="button"
                  value={imageURL}
                  style={{
                    position: "relative",
                    width: 100,
                    height: 100,
                    backgroundImage: `url(${imageURL})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  className="flex justify-center items-end text-center rounded-md cursor-pointer hover:outline outline-gray-700"
                  onClick={() => {
                    onSelect(imageURL);
                  }}
                />
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
              {images.map(([, attributionURL], index) => (
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
  );
};
