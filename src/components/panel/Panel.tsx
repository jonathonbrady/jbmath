/**
 * @Cleanup - In general, let's not disable linter rules. They exist for a reason, but also,
 * redesigning the anchor tag's CSS could not be a worse use of development time right now.
 */
/* eslint "jsx-a11y/anchor-is-valid": 0 */

import { useState } from 'react';

export interface IPanel {
  content: Array<PanelContent>;
  setSelectedItem: (item: string) => void;
}

export interface PanelContent {
  name: string;
  content: Array<string>;
}

const Panel = ({ content, setSelectedItem }: IPanel) => {
  const { tabs, tabContent } = useContent(content, setSelectedItem);

  return (
    <nav className="panel">
      {tabs}
      {tabContent}
    </nav>
  );
};

function isActive(b: boolean) {
  return b ? 'is-active' : '';
}

function useContent(
  pc: PanelContent[],
  setSelectedItem: (name: string) => void
) {
  const [activeTab, setActiveTab] = useState<string>(pc[0].name);
  const [activeItem, setActiveItem] = useState<string>('');

  const tabs = (
    <p className="panel-tabs">
      {pc.map((tab) => (
        <a
          className={isActive(tab.name === activeTab)}
          onClick={() => setActiveTab(tab.name)}
        >
          {tab.name}
        </a>
      ))}
    </p>
  );

  const tabContent = pc
    .find((tab) => tab.name === activeTab)
    ?.content.map((item) => (
      <a
        className={`panel-block ` + isActive(item === activeItem)}
        onClick={() => {
          setActiveItem(item);
          setSelectedItem(item);
        }}
      >
        {item}
      </a>
    ));

  return { tabs, tabContent };
}

export default Panel;
