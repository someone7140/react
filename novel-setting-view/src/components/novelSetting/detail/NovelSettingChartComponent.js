import { useEffect, useState } from "react";

import { OrganizationChart } from "primereact/organizationchart";

export default function NovelSettingChartComponent(prop) {
  const [chartData, setChartData] = useState(undefined);

  useEffect(() => {
    const setting = prop.setting;
    const makeChildrenChart = (level, children) => {
      if (!children) {
        return [];
      }
      return children.map((child) => {
        if (level == 1) {
          return {
            label: child.value,
            expanded: true,
            children: makeChildrenChart(level + 1, child.children),
          };
        }
        return {
          label: child.name,
          value: child.value,
          expanded: false,
          children: makeChildrenChart(level + 1, child.children),
        };
      });
    };

    const updateChartData = [
      {
        label: setting.name,
        expanded: true,
        children: makeChildrenChart(1, setting.settings),
      },
    ];
    setChartData(updateChartData);
  }, [prop.setting]);

  const nodeTemplate = (node) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          minWidth: 70,
        }}
      >
        <div
          style={{
            fontWeight: 600,
          }}
        >
          {node.label}
        </div>
        <div>{node.value}</div>
      </div>
    );
  };

  return (
    <>
      {chartData && (
        <OrganizationChart value={chartData} nodeTemplate={nodeTemplate} />
      )}
    </>
  );
}
