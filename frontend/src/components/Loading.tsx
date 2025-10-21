import loadingGif from "../assets/image/loadingGif.gif";

function Loading() {
  return (
    <div className="bg-blue flex h-full w-full items-center justify-center">
      <img src={loadingGif} />
    </div>
  );
}

export default Loading;
