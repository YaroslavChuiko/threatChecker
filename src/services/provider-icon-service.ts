import DiscordIcon from "~/components/icons/DiscordIcon";
import GithubIcon from "~/components/icons/GithubIcon";
import GoogleIcon from "~/components/icons/GoogleIcon";
import EnvelopeIcon from "~/components/icons/EnvelopeIcon";

const PROVIDER_ICONS = {
  google: GoogleIcon,
  github: GithubIcon,
  discord: DiscordIcon,
  email: EnvelopeIcon,
} as const;

type IconKey = keyof typeof PROVIDER_ICONS;

export const getProviderIcon = (
  iconName: IconKey,
): (typeof PROVIDER_ICONS)[IconKey] => {
  return PROVIDER_ICONS[iconName] || PROVIDER_ICONS.email;
};
