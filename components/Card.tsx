import Image from "next/image";
export const MediaCard = (props: {
  src: string;
  title: string;
  content: string;
}) => {
  return (
    <div className="grid grid-rows-3 grid-flow-col gap-4 items-center">
      <div className="row-span-3">
        <Image
          src={props.src}
          alt=""
          width={100}
          height={124}
          objectFit="contain"
        />
      </div>
      <div className="col-span-2 uppercase font-bold">{props.title}</div>
      <div className="row-span-2 col-span-2">{props.content}</div>
    </div>
  );
};
export default MediaCard;
