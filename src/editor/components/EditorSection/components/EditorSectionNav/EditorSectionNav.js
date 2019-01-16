// @flow
import React from 'react';
import type { Node } from 'react';
import { FaThList, FaPaintBrush, FaCode } from 'react-icons/fa';
import { cx } from 'emotion';
import styles from './styles';

type NavOptionModel = {
  key: string,
  label: string,
  icon: Node,
};

export const CONTENT_NAV_OPTION: NavOptionModel = {
  key: 'content',
  label: 'Content',
  icon: <FaThList size={10} />,
};

export const STYLES_NAV_OPTION: NavOptionModel = {
  key: 'styles',
  label: 'Styles',
  icon: <FaPaintBrush size={11} />,
};

export const HTML_NAV_OPTION: NavOptionModel = {
  key: 'html',
  label: 'HTML',
  icon: <FaCode size={12} />,
};

const options: Array<NavOptionModel> = [CONTENT_NAV_OPTION, STYLES_NAV_OPTION, HTML_NAV_OPTION];

type NavOptionProps = {
  label: string,
  icon: Node,
  selected: boolean,
  onClick: () => void,
};

const NavOption = ({ label, icon, selected, onClick }: NavOptionProps) => (
  <div
    className={cx(styles.navOptionClass, {
      [styles.navOptionSelectedClass]: selected,
    })}
    onClick={onClick}
  >
    <div className={styles.navOptionIconClass}>{icon}</div>
    <div className={styles.navOptionTextClass}>{label}</div>
  </div>
);

type Props = {
  selectedTab: string,
  setTab: (tab: string) => void,
};

const EditorSectionNav = ({ selectedTab, setTab }: Props) => (
  <div className={styles.wrapperClass}>
    <nav className={styles.containerClass}>
      {options.map(option => (
        <NavOption
          label={option.label}
          key={option.key}
          icon={option.icon}
          selected={option.key === selectedTab}
          onClick={() => {
            setTab(option.key);
          }}
        />
      ))}
    </nav>
  </div>
);

export default EditorSectionNav;
