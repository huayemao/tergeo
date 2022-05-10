import { ToggleSwitch } from './common/FormControls/ToggleSwitch';

export function SettingItem({
  label, Icon, open, detail,
}: {
  label: string;
  Icon: any;
  open: boolean;
  detail: JSX.Element;
}): JSX.Element {
  return (
    <div key={label}>
      <a
        href="#"
        aria-current="true"
        className="flex w-full cursor-pointer items-center rounded-t-lg  px-4 py-2  dark:border-gray-600 dark:bg-gray-800"
      >
        {Icon && <Icon className="mr-2 h-6 w-6"></Icon>}
        {label}
        <ToggleSwitch className="ml-auto" defaultChecked={open} />
      </a>
      {open && detail && (
        <div className="bg-indigo-50/80 px-8 py-4">{detail}</div>
      )}
    </div>
  );
}
