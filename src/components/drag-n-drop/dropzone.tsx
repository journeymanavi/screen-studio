import { cn } from "@/lib/utils";
import {
  DragEventHandler,
  HTMLAttributes,
  useCallback,
  useRef,
  useState,
} from "react";

export type DropzoneProps = Omit<HTMLAttributes<HTMLDivElement>, "onDrop"> &
  Required<Pick<HTMLAttributes<HTMLDivElement>, "onDrop">>;

export const Dropzone = ({
  onDragEnter,
  onDragLeave,
  onDrop,
  onDragOver,
  className,
  children,
}: DropzoneProps) => {
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragEnter = useCallback<DragEventHandler<HTMLDivElement>>((e) => {
    setIsDragOver(true);
    onDragEnter?.(e);
  }, []);

  const handleDragLeave = useCallback<DragEventHandler<HTMLDivElement>>((e) => {
    setIsDragOver(false);
    onDragLeave?.(e);
  }, []);

  const handleDrop = useCallback<DragEventHandler<HTMLDivElement>>((e) => {
    e.stopPropagation();

    onDrop(e);

    setIsDragOver(false);
  }, []);

  const handleDragOver = useCallback<DragEventHandler<HTMLDivElement>>((e) => {
    e.preventDefault();
    onDragOver?.(e) ?? e.preventDefault();
  }, []);

  return (
    <div
      ref={dropzoneRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={cn(
        {
          "outline-2 -outline-offset-2 outline-dashed outline-sky-500":
            isDragOver,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
