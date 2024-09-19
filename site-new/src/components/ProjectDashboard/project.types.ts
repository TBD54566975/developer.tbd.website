export type AllShieldTypes =
  | GHWorkFlowType
  | (LicenseType & { group: Group | (string & {}); packageName: PackageName })
  | ScanType
  | OssfType
  | SastType
  | TestsType
  | CiStatusType
  | (ReleaseType & { group: Group | (string & {}); packageName: PackageName })
  | { type?: "badge" };

export type GHWorkFlowType = {
  type: "ghWorkflow";
  label: string;
  value: string;
};

export type LicenseType = {
  type: "ghLicense" | "npmLicense";
};

export type ScanType =
  | GHWorkFlowType
  | { type: "fossa-license" }
  | { type: "fossa-security" };

export type OssfType = {
  type: "ossf";
};

export type SastType = GHWorkFlowType | { type: "sast" };

export type TestsType = { type: "codecov" } | { type: "vectors" };

export type ApiDocs = GHWorkFlowType | { value: string; href: string };

export type CiStatusType = GHWorkFlowType;

export type ReleaseType =
  | { type: "ghTag"; value?: string }
  | { type: "npmPkg" }
  | { type: "mavenCentral"; value: string };

export type Language = "js" | "kt" | "swift";
export type Group = "web5" | "tbdex";
export type PackageName =
  | "common"
  | "credentials"
  | "crypto"
  | "dids"
  | "protocol"
  | "http-client"
  | "http-server"
  | (string & {});
export type Repo = `${Group}-${Language}`;

export type Project = {
  url: `https://github.com/${string}`;
  language: Language;
  repo: Repo;
  group?: Group;
  packageName?: PackageName;
  ciStatus: CiStatusType[];
  license: LicenseType[];
  scan: ScanType[];
  ossf: OssfType[];
  sast: SastType[];
  tests: TestsType[];
  release: ReleaseType[];
  apiDocs: ApiDocs[];
};
