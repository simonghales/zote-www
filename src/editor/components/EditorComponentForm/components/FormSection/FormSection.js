// @flow
import type { Node } from 'react';
import React, { useContext } from 'react';
import { cx } from 'emotion';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import styles from './styles';
import { EditorComponentFormContext } from '../EditorComponentFormContextWrapper/context';

type Props = {
  heading: string,
  children: Node,
  visibilityKey?: string,
};

const isSectionVisible = (
  visibilityKey: string,
  formSectionsVisibility: {
    [string]: boolean,
  }
): boolean => {
  if (!visibilityKey) return true;
  if (Object.prototype.hasOwnProperty.call(formSectionsVisibility, visibilityKey)) {
    return formSectionsVisibility[visibilityKey];
  }
  return true;
};

const FormSection = ({ heading, children, visibilityKey = '' }: Props) => {
  const { formSectionsVisibility, setFormSectionVisibility } = useContext(
    EditorComponentFormContext
  );

  const visible = isSectionVisible(visibilityKey, formSectionsVisibility);

  const toggleVisible = () => {
    setFormSectionVisibility(visibilityKey, !visible);
  };
  return (
    <div className={styles.containerClass}>
      {heading && (
        <header className={styles.headerClass} onClick={toggleVisible}>
          <div className={styles.headerTextClass}>{heading}</div>
          {visibilityKey && (
            <div className={styles.headerIconClass}>
              {visible ? <FaChevronDown size={8} /> : <FaChevronRight size={8} />}
            </div>
          )}
        </header>
      )}
      <div
        className={cx({
          [styles.hiddenBodyClass]: !visible,
        })}
      >
        {children}
      </div>
    </div>
  );
};

FormSection.defaultProps = {
  visibilityKey: '',
};

export default FormSection;
