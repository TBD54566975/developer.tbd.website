import Link from "@docusaurus/Link";
import { AllShieldTypes, Repo } from "./project.types";

const getRepo = ({ repo, ...props }: AllShieldTypes & { repo: Repo }) => {
  switch (props.type) {
    case "ghWorkflow":
      return `https://github.com/TBD54566975/${repo}/actions/workflows/${props.value}`;
    case "ghLicense":
      return `https://img.shields.io/github/license/TBD54566975/${repo}?style=flat-square&logo=github&color=4c1&label=gh`;
    case "fossa-license":
      return `https://app.fossa.com/projects/custom%2B588%2Fgithub.com%2FTBD54566975%2F${repo}?ref=badge_shield&issueType=license`;
    case "fossa-security":
      return `https://app.fossa.com/projects/custom%2B588%2Fgithub.com%2FTBD54566975%2F${repo}?ref=badge_shield&issueType=security`;
    case "ossf":
      return `https://securityscorecards.dev/viewer/?uri=github.com/TBD54566975/${repo}`;
    case "codecov":
      return `https://codecov.io/github/TBD54566975/${repo}`;
    case "ghTag":
      return `https://github.com/TBD54566975/${repo}/releases`;
    case "npmLicense":
      return `https://www.npmjs.com/package/@${props.group}/${props.packageName}`;
    case "npmPkg":
      return `https://www.npmjs.com/package/@${props.group}/${props.packageName}`;
    case "mavenCentral":
      return `https://central.sonatype.com/artifact/xyz.block/${props.value}`;
    case "vectors":
      return "https://tbd54566975.github.io/sdk-report-runner/";
    default:
      return "";
  }
};

const getBadgeUrl = ({ repo, ...props }: AllShieldTypes & { repo: Repo }) => {
  switch (props.type) {
    case "ghWorkflow":
      return `https://img.shields.io/github/actions/workflow/status/TBD54566975/${repo}/${props.value}?style=flat-square&branch=main&logo=github&label=${props.label}&logoColor=FFFFFF`;
    case "ghLicense":
      return `https://img.shields.io/github/license/TBD54566975/${repo}?style=flat-square&logo=github&color=4c1&label=gh`;
    case "fossa-license":
      return `https://app.fossa.com/api/projects/custom%2B588%2Fgithub.com%2FTBD54566975%2F${repo}.svg?type=shield&issueType=license`;
    case "fossa-security":
      return `https://app.fossa.com/api/projects/custom%2B588%2Fgithub.com%2FTBD54566975%2F${repo}.svg?type=shield&issueType=security`;
    case "ossf":
      return `https://img.shields.io/ossf-scorecard/github.com/TBD54566975/${repo}?label=ossf&style=flat-square`;
    case "codecov":
      return `https://img.shields.io/codecov/c/gh/TBD54566975/${repo}/main?label=codecov&style=flat-square&token=YI87CKF1LI`;
    case "ghTag": {
      let badgeSrc = `https://img.shields.io/github/v/release/TBD54566975/${repo}?logo=github&label=tag&style=flat-square&color=4c1`;
      if (props.value) {
        badgeSrc += `&filter=${props.value}`;
      }
      return badgeSrc;
    }
    case "npmLicense":
      return `https://img.shields.io/npm/l/@${props.group}/${props.packageName}.svg?style=flat-square&logo=npm&logoColor=FFFFFF&&color=4c1&santize=true&label=npm`;
    case "npmPkg":
      return `https://img.shields.io/npm/v/@${props.group}/${props.packageName}.svg?style=flat-square&logo=npm&logoColor=FFFFFF&color=4c1&santize=true`;
    case "mavenCentral":
      return `https://img.shields.io/maven-central/v/xyz.block/${props.value}?color=green`;
    case "vectors":
      return `https://tbd54566975.github.io/sdk-report-runner/${repo}.svg`;
    default:
      return `https://img.shields.io/${props.type}/--purple?style=flat-square`;
  }
};

const Shield = ({
  href,
  ...props
}: AllShieldTypes & { repo: Repo; href?: string }) => {
  const repo = href ?? getRepo({ ...props });
  const badgeSrc = getBadgeUrl({ ...props });
  const img = <img className="m-0.5" src={badgeSrc} />;
  return repo ? (
    <Link href={repo} target="_blank">
      {img}
    </Link>
  ) : (
    img
  );
};

export default Shield;
