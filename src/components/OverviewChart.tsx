import { useMemo } from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import { useTheme } from '@mui/material';
import { useGetSalesQuery } from '../state/api';

type OverviewPropsType = {
    isDashboard?: boolean;
    view: string;
}

type LineDataType = {
    x: string;
    y: number;
}

type LineObjType = {
    id: string;
    color: string;
    data: LineDataType[]
}

type MemoValTypes = {
    totalSalesLine: Serie[];
    totalUnitsLine: Serie[];
}

const OverviewChart = ({ isDashboard = false, view } : OverviewPropsType) => {
    const theme = useTheme();
    const { data, isLoading, error } = useGetSalesQuery();

    const { totalSalesLine, totalUnitsLine } : MemoValTypes = useMemo(() => {
        if(!data) return { totalSalesLine: [], totalUnitsLine: [] };

        const { monthlyData } = data;
        const totalSalesLine : LineObjType = {
            id: "totalSales",
            color: theme.palette.secondary.main,
            data: [] as LineDataType[],
        }

        const totalUnitsLine : LineObjType = {
            id: "totalUnits",
            color: theme.palette.secondary[600],
            data: [] as LineDataType[]
        }

        Object.values(monthlyData).reduce( 
            (acc: {sales: number, units: number}, { month, totalSales, totalUnits }) => {
                const curSales = acc.sales + totalSales;
                const curUnits = acc.units + totalUnits;

                totalSalesLine.data.push({ x: month, y: curSales })
                totalUnitsLine.data.push({ x: month, y: curUnits })

                return { sales: curSales, units: curUnits };
            }, 
            {sales: 0, units: 0}
        )

        return { totalSalesLine: [totalSalesLine], totalUnitsLine: [totalUnitsLine]};
    }, [data])

    if(isLoading) return "Loading...";

    return (
        <ResponsiveLine
          data={view === "sales" ? totalSalesLine : totalUnitsLine}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.secondary[200],
              },
            },
            tooltip: {
              container: {
                color: theme.palette.primary.main,
              },
            },
          }}
          margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="catmullRom"
          enableArea={isDashboard}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: (v) => {
              if (isDashboard) return v.slice(0, 3);
              return v;
            },
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? "" : "Month",
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard
              ? ""
              : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
            legendOffset: -60,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={
            !isDashboard
              ? [
                  {
                    anchor: "bottom-right",
                    direction: "column",
                    justify: false,
                    translateX: 30,
                    translateY: -40,
                    itemsSpacing: 0,
                    itemDirection: "left-to-right",
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: "circle",
                    symbolBorderColor: "rgba(0, 0, 0, .5)",
                    effects: [
                      {
                        on: "hover",
                        style: {
                          itemBackground: "rgba(0, 0, 0, .03)",
                          itemOpacity: 1,
                        },
                      },
                    ],
                  },
                ]
              : undefined
          }
        />
    )
}

export default OverviewChart
