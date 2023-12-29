import {
  GOOGLE_FAVICON_URL,
  getApexDomain,
  isValidUrl,
  truncate,
} from "@/lib/utils";
import { useParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Logo from "./Logo";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertCircle, Loader2, Lock, Shuffle } from "lucide-react";
import { Input } from "./ui/input";
import Preview from "./Preview";
import { Button } from "./ui/button";

export interface LinkProps {
  id?: string;
  domain: string;
  key: string;
  url: string;
  expiresAt: Date | null;
  password: string | null;

  title: string | null;
  description: string | null;
  image: string | null;

  clicks: number;
  userId: string;

  createdAt: Date;
}

function AddEditLinkModal({
  showAddEditLinkModal,
  setShowAddEditLinkModal,
  props,
}: {
  showAddEditLinkModal: boolean;
  setShowAddEditLinkModal: Dispatch<SetStateAction<boolean>>;
  props?: LinkProps;
}) {
  const [keyError, setKeyError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [generatingKey, setGeneratingKey] = useState(false);

  const [data, setData] = useState<LinkProps>(
    props || {
      id: "",
      domain: "",
      key: "",
      url: "",
      expiresAt: null,
      password: null,

      title: null,
      description: null,
      image: null,

      clicks: 0,
      userId: "",
      createdAt: new Date(),
    }
  );

  const { key, url, password } = data;

  const generateRandomKey = useCallback(async () => {
    setKeyError(null);
    setGeneratingKey(true);
    const key = (Math.random() + 1).toString(36).substring(2);
    setData((prev) => ({ ...prev, key }));
    setGeneratingKey(false);
  }, []);

  const [generatingMetatags, setGeneratingMetatags] = useState(
    props ? true : false
  );
  useEffect(() => {
    // if there's a password, no need to generate metatags
    if (password) {
      setGeneratingMetatags(false);
      setData((prev) => ({
        ...prev,
        title: "Password Required",
        description:
          "This link is password protected. Please enter the password to view it.",
        image: "/_static/password-protected.png",
      }));
      return;
    }
    console.log(showAddEditLinkModal);
    if (showAddEditLinkModal) {
      setData((prev) => ({
        ...prev,
        title: null,
        description: null,
        image: null,
      }));
      try {
        new URL(url);
        setGeneratingMetatags(true);
        fetch(`/api/edge/metatags?url=${url}`).then(async (res) => {
          console.log(res);
          if (res.status === 200) {
            const results = await res.json();

            setData((prev) => ({
              ...prev,
              ...{
                title: truncate(results.title, 120),
                description: truncate(results.description, 240),
                image: results.image,
              },
            }));
          }
          setTimeout(() => setGeneratingMetatags(false), 200);
        });
      } catch (e) {
        console.log("not a valid url");
      }
    } else {
      setGeneratingMetatags(false);
    }
  }, [password, showAddEditLinkModal, url]);

  const logo = useMemo(() => {
    const url = password || props?.url;

    return url ? (
      <Image
        src={`${GOOGLE_FAVICON_URL}${getApexDomain(url)}`}
        alt="Logo"
        className="h-10 w-10 rounded-full"
        width={20}
        height={20}
      />
    ) : (
      <Logo />
    );
  }, [password, props]);

  const [lockKey, setLockKey] = useState(true);

  const keyRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (key && key.endsWith("-copy")) {
      keyRef.current?.select();
    }
  }, [key]);
  const randomIdx = Math.floor(Math.random() * 100);

  return (
    <Dialog open={showAddEditLinkModal} onOpenChange={setShowAddEditLinkModal}>
      <DialogContent className="w-[925px] max-w-[90vw]">
        <div className="scrollbar-hide grid max-h-[90vh] w-full divide-x divide-gray-100 overflow-auto grid-cols-2 ">
          <div className="rounded-l-2xl max-h-[90vh] scrollbar-hide overflow-auto">
            <div className="z-10 flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 pb-8 pt-7 transition-all sticky top-0">
              {logo}
              <h3 className="max-w-sm truncate text-lg font-medium">
                Create a new link
              </h3>
            </div>
            <div className="px-4 py-4 flex-col h-[83.5%]">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`url-${randomIdx}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Destination URL
                  </label>
                  {urlError && (
                    <p className="text-sm text-red-600" id="key-error">
                      Invalid url.
                    </p>
                  )}
                </div>
                <Input
                  name="url"
                  id={`url-${randomIdx}`}
                  type="url"
                  required
                  value={url}
                  autoFocus={!key}
                  autoComplete="off"
                  onChange={(e) => {
                    setUrlError(null);
                    setData({ ...data, url: e.target.value });
                  }}
                  className="focus:outline-none focus:ring rounded-r-md"
                  aria-invalid="true"
                />
              </div>
              <div className="mt-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor={`key-${randomIdx}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Short Link
                  </label>
                  {props && lockKey ? (
                    <button
                      className="flex items-center space-x-2 text-sm text-gray-500 transition-all duration-75 hover:text-black active:scale-95"
                      type="button"
                      onClick={() => {
                        window.confirm(
                          "Editing an existing short link will result in broken links and reset its analytics. Are you sure you want to continue?"
                        ) && setLockKey(false);
                      }}
                    >
                      <Lock className="h-3 w-3" />
                      <p>Unlock</p>
                    </button>
                  ) : (
                    <button
                      className="flex items-center space-x-2 text-sm text-gray-500 transition-all duration-75 hover:text-black active:scale-95"
                      onClick={generateRandomKey}
                      disabled={generatingKey}
                      type="button"
                    >
                      {generatingKey ? (
                        <Loader2 />
                      ) : (
                        <Shuffle className="h-3 w-3" />
                      )}
                      <p>{generatingKey ? "Generating" : "Randomize"}</p>
                    </button>
                  )}
                </div>
                <div className="relative mt-1 flex rounded-md shadow-sm">
                  <Input
                    type="text"
                    disabled
                    autoComplete="off"
                    className="focus:outline-none focus:ring rounded-r-md"
                    placeholder="localhost:3000/"
                    aria-invalid="true"
                    aria-describedby="key-error"
                  />
                  <Input
                    ref={keyRef}
                    type="text"
                    name="key"
                    id={`key-${randomIdx}`}
                    required
                    pattern="[\p{L}\p{N}\p{Pd}\/]+"
                    onInvalid={(e) => {
                      e.currentTarget.setCustomValidity(
                        "Only letters, numbers, '-', and '/' are allowed."
                      );
                    }}
                    disabled={props && lockKey}
                    autoComplete="off"
                    className="focus:outline-none focus:ring rounded-r-md"
                    placeholder="abcxyz"
                    value={key}
                    onChange={(e) => {
                      setKeyError(null);
                      e.currentTarget.setCustomValidity("");
                      setData({ ...data, key: e.target.value });
                    }}
                    aria-invalid="true"
                    aria-describedby="key-error"
                  />
                  {keyError && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <AlertCircle
                        className="h-5 w-5 text-red-500"
                        aria-hidden="true"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="relative pb-3 pt-8">
                <div
                  className="absolute inset-0 flex items-center px-3 pt-5"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-50 px-2 text-sm text-gray-500">
                    Optional
                  </span>
                </div>
              </div>
              <div className="flex-1">
                <Button className="w-full" disabled={!isValidUrl(url)}>
                  Create link
                </Button>
              </div>
            </div>
          </div>
          <div className="scrollbar-hide rounded-r-2xl max-h-[90vh] overflow-auto">
            <Preview data={data} generatingMetatags={generatingMetatags} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AddEditLinkButton({
  setShowAddEditLinkModal,
}: {
  setShowAddEditLinkModal: Dispatch<SetStateAction<boolean>>;
}) {
  const { slug } = useParams() as { slug?: string };

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "c") {
      e.preventDefault();
      setShowAddEditLinkModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePaste = (e: ClipboardEvent) => {
    const pastedContent = e.clipboardData?.getData("text");

    if (pastedContent && isValidUrl(pastedContent)) {
      setShowAddEditLinkModal(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("keydown", onKeyDown),
        document.removeEventListener("paste", handlePaste);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onKeyDown]);

  return (
    <button
      onClick={() => setShowAddEditLinkModal(true)}
      className="group flex items-center space-x-3 rounded-md border border-black bg-black px-3 py-2 text-sm font-medium text-white transition-all duration-75 hover:bg-white hover:text-black active:scale-95"
    >
      <p>Create link</p>
      <kbd className="rounded bg-zinc-700 px-2 py-0.5 text-xs font-light text-gray-400 transition-all duration-75 group-hover:bg-gray-100 group-hover:text-gray-500 inline-block">
        C
      </kbd>
    </button>
  );
}

export function useAddEditLinkModal({
  props,
}: {
  props?: LinkProps;
} = {}) {
  const [showAddEditLinkModal, setShowAddEditLinkModal] = useState(false);

  const AddEditLinkModalCallback = useCallback(() => {
    return (
      <AddEditLinkModal
        showAddEditLinkModal={showAddEditLinkModal}
        setShowAddEditLinkModal={setShowAddEditLinkModal}
        props={props}
      />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAddEditLinkModal, setShowAddEditLinkModal]);

  const AddEditLinkButtonCallback = useCallback(() => {
    return (
      <AddEditLinkButton setShowAddEditLinkModal={setShowAddEditLinkModal} />
    );
  }, [setShowAddEditLinkModal]);

  return useMemo(
    () => ({
      showAddEditLinkModal,
      setShowAddEditLinkModal,
      AddEditLinkModal: AddEditLinkModalCallback,
      AddEditLinkButton: AddEditLinkButtonCallback,
    }),
    [
      showAddEditLinkModal,
      setShowAddEditLinkModal,
      AddEditLinkModalCallback,
      AddEditLinkButtonCallback,
    ]
  );
}
