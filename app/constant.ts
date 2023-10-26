//定义枚举  例如：Path..

export const OWNER = "";
export const REPO = "";
export const REPO_URL = `http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=Gj_i54o0eIO8-ewC2fcIjQW-NYil9zba&authKey=AsifQqekDDfhyyGpfD3ceEZ8BMkCYKpecfCEmjNAe0lKz6pF%2FySCFob1w9fLT7cp&noverify=0&group_code=876649727`;
export const ISSUE_URL = ``;
export const UPDATE_URL = ``;
export const FETCH_COMMIT_URL = ``;
export const FETCH_TAG_URL = ``;
export const RUNTIME_CONFIG_DOM = "";
export const DEFAULT_API_HOST = "";

export enum Path {
  Home = "/",
  Chat = "/chat",
  Settings = "/settings",
  NewChat = "/new-chat",
  Masks = "/masks",
  Auth = "/auth",
  Login = "/login",
  Register = "/register",
  Commodity = "/commodity",
  Paying = "/paying",
}

export enum SlotID {
  AppBody = "app-body",
}

export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export enum StoreKey {
  Chat = "chat-next-web-store",
  Access = "access-control",
  Config = "app-config",
  Mask = "mask-store",
  Prompt = "prompt-store",
  Update = "chat-update",
}

//侧边栏宽度
export const MAX_SIDEBAR_WIDTH = 500;   
export const MIN_SIDEBAR_WIDTH = 230;
//小于230时会默认一种展示方式
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "ak-";

export const LAST_INPUT_KEY = "last-input";

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
};
