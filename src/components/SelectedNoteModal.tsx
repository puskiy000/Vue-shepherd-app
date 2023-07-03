import { storage } from "../firebase";
import { UploadIcon } from "./icons";
import { Transition, Dialog } from "@headlessui/react";
import { getAuth } from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import { Fragment, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type List = {
  name: string;
  fullPath: string;
};

interface ShowProps {
  show: boolean;
  setShow: (show: boolean) => void;
  setShowHelp: (showHelp: boolean) => void;
}

const SelectedModal = ({ show, setShow, setShowHelp }: ShowProps) => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState("");
  const [progress, setProgress] = useState("");
  const [list, setList] = useState<Array<List>>([]);
  const [file, setFile] = useState<Blob | Uint8Array | ArrayBuffer>();
  const [selectedOption, setSelectedOption] = useState("");
  const [docPath, setDocPath] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [loadedList, setLoadedList] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const { currentUser } = getAuth();
    const listEverything = async (path) => {
      const listRef = ref(storage, path);
      listAll(listRef)
        // @ts-ignore
        .then((res) => setList(res.items));
    };

    if (currentUser?.uid) {
      setDocPath(currentUser.uid);
      listEverything(currentUser?.uid);
      setLoadedList(true);
    }
  }, [docPath]);

  const clickInput = (_) => {
    // @ts-ignore
    inputRef.current.click();
  };

  const collectFile = (e) => {
    const { name } = e.target.files[0];
    setUploadError("");
    setFileName(name);
    setFile(e.target.files[0]);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleSelected = (e) => {
    setSelectedOption(e.target.value);
  };

  const processOrContinue = async (e) => {
    if (!file && !selectedOption)
      return setUploadError("You haven't uploaded a file or selected a note.");

    if (selectedOption) {
      // @ts-ignore
      const documentUrl = await getDownloadURL(ref(storage, selectedOption));
      const item = list.filter((list) => list.fullPath === selectedOption);
      setShow(false);
      setShowHelp(false);
      navigate("/dashboard/docchat", {
        state: {
          documentUrl,
          docTitle: item[0].name,
        },
      });
    }

    if (file) {
      const storageRef = ref(
        storage,
        `${docPath}/${fileName.toLowerCase().replace(/\s/g, "")}`
      );
      const task = uploadBytesResumable(storageRef, file);

      task.on(
        "state_changed",
        (snapshot) => {
          const progress = `Upload is ${Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )}% done`;

          switch (snapshot.state) {
            case "running":
              setProgress(progress);
              break;
            case "success":
              setProgress("Complete!");
              const documentUrl = getDownloadURL(snapshot.ref);
              const title = snapshot.metadata.name;
              setShow(false);
              setShowHelp(false);
              navigate("/dashboard/docchat", {
                state: {
                  documentUrl,
                  docTitle: title,
                },
              });
              break;
          }
        },
        (error) => console.log(error)
      );
    }
  };

  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog as="div" className="relative z-[999]" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white pt-5 text-left shadow-xl transition-all sm:w-full sm:max-w-sm">
                <div>
                  <div className="flex justify-center px-2 border-b pb-3">
                    <span className="text-dark font-semibold">Select Note</span>
                  </div>
                  <div className="p-4">
                    {loadedList && (
                      <div>
                        <label
                          htmlFor="note"
                          className="block text-sm font-medium leading-6 text-gray-500"
                        >
                          Select note
                        </label>
                        <select
                          id="note"
                          name="note"
                          className="mt-2 block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-400 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-gray-200 sm:text-sm sm:leading-6"
                          defaultValue="Select from your note"
                          onChange={handleSelected}
                        >
                          {loadedList &&
                            list.map((item, id) => (
                              // @ts-ignore
                              <option value={item.fullPath} key={id}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                        <div className="relative flex my-4 justify-center text-sm font-medium leading-6">
                          <span className="px-6 text-gray-400">Or</span>
                        </div>
                      </div>
                    )}

                    <div
                      className={`flex w-full justify-between rounded-md bg-white ring-1 ring-primaryBlue px-3 py-1 mb-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-50 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-within:outline-blue-600`}
                    >
                      <span
                        className="flex items-center space-x-2"
                        onClick={clickInput}
                      >
                        <UploadIcon
                          className="text-primaryGray w-5 h-5"
                          onClick={clickInput}
                        />
                        <span className="text-dark">Upload doc</span>
                      </span>

                      {/* Uploading Progress */}
                      <div className="flex items-center justify-center">
                        <div className="relative w-8 h-8">
                          <div className="absolute inset-0 border-4 border-t-4 border-primaryBlue rounded-full"></div>
                        </div>
                      </div>
                    </div>
                    {uploadError && (
                      <p className="text-sm text-red-700">{uploadError}</p>
                    )}
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      id="file-upload"
                      ref={inputRef}
                      onChange={collectFile}
                    />
                    <div className="text-center mb-6">
                      <p className="text-sm text-left leading-5 text-gray-600">
                        Shepherd supports{" "}
                        <span className="text-secondaryGray font-semibold">
                          .pdf, .ppt, .jpg & .txt
                        </span>{" "}
                        document formats
                      </p>
                    </div>
                    {fileName && (
                      <span className="text-sm text-green-500">{fileName}</span>
                    )}
                    {progress && (
                      <span className="text-sm text-purple-500 ml-4">
                        {progress}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mt-2 p-3 space-x-4 flex justify-end w-full bg-gray-100 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-fit justify-center rounded-md shadow-md bg-white ring-1 ring-gray-400 px-3 py-2 text-sm font-semibold text-primaryGray hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex w-fit justify-center rounded-md bg-primaryBlue px-3 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={processOrContinue}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SelectedModal;
