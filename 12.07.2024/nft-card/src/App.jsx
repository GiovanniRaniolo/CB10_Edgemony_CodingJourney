import Image from "./assets/images/0x-Jitzu_-_Geomancy_feat._Sonte.jpeg";
import Icon from "./assets/images/icon-ethereum.svg";
import IconTwo from "./assets/images/icon-clock.svg";
import Avatar from "./assets/images/avatar.png";
import EyeIcon from "./assets/images/icon-view.svg";

function App() {
  return (
    <div className="min-h-screen bg-neutral-veryDarkBlueMain text-neutral-white font-outfit flex items-center justify-center p-2">
      <div className="relative">
        <div className="flex flex-col items-center bg-neutral-veryDarkBlueCard rounded-md p-4 shadow-dark-blue">
          <div className="relative group">
            <img className="rounded-md w-56 h-56" src={Image} alt="nft image" />
            {/* Overlay e icona */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-90 bg-primary-cyan bg-opacity-50 rounded-md">
              <img
                src={EyeIcon}
                alt="eye icon"
                className="w-12 h-12 text-primary-cyan"
              />
            </div>
          </div>
          <div className="text-left mt-3 w-56">
            <h1 className="text-white font-medium mb-2">Geomancy</h1>
            <p className="text-sm text-gray-500">
              Made with Sonte, promotes balance and calm.
            </p>
          </div>
          <div className="flex justify-between w-56">
            <div className="flex items-center justify-start gap-1 mt-4 text-sm">
              <img src={Icon} alt="eth" className="w-2 h-3" />
              <span className="text-primary-cyan">0.5 ETH</span>
            </div>
            <div className="flex items-center justify-start gap-1 mt-4 text-sm">
              <img src={IconTwo} alt="eth" className="w-3 h-3" />
              <span className="text-gray-500">3 days left</span>
            </div>
          </div>
          <hr className="border-gray-500 my-4 w-56" />
          <div className="flex justify-start items-center gap-3 text-sm w-56 mb-2">
            <img
              src={Avatar}
              alt="avatar"
              className="w-6 h-6 border border-gray-300 rounded-full"
            />
            <p className="text-gray-500">
              Creation of <span className="text-white">Jitzu</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
