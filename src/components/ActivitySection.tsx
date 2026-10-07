import React, { useState, useEffect, useMemo } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  ALL_YEARS_CONTRIBUTION_DATA,
  FALLBACK_CONTRIBUTION_DATA,
  fetchLiveGitHubContributions,
  GitHubContributionResponse
} from '../data/githubContributions';

// Official GitHub Green Color Ramp (adapted via CSS variables)
const GITHUB_HEAT_COLORS: Record<number, string> = {
  0: 'var(--github-heat-0, #ebedf0)',
  1: 'var(--github-heat-1, #9be9a8)',
  2: 'var(--github-heat-2, #40c463)',
  3: 'var(--github-heat-3, #30a14e)',
  4: 'var(--github-heat-4, #216e39)'
};

const AVAILABLE_YEARS = [
  { id: 'last', label: 'Last Year' },
  { id: '2026', label: '2026' },
  { id: '2025', label: '2025' },
  { id: '2024', label: '2024' },
  { id: '2023', label: '2023' },
  { id: '2022', label: '2022' }
];

export const ActivitySection: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<string>('last');
  const [yearDataMap, setYearDataMap] = useState<Record<string, GitHubContributionResponse>>(
    ALL_YEARS_CONTRIBUTION_DATA
  );

  // Fetch live contributions when selectedYear changes
  useEffect(() => {
    let isMounted = true;
    fetchLiveGitHubContributions(selectedYear, 'nasifrhman')
      .then((res) => {
        if (isMounted && res?.contributions?.length) {
          setYearDataMap((prev) => ({
            ...prev,
            [selectedYear]: res
          }));
        }
      })
      .catch((err) => {
        console.warn(`Could not refresh GitHub data for ${selectedYear}:`, err);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  const activeData: GitHubContributionResponse =
    yearDataMap[selectedYear] ||
    ALL_YEARS_CONTRIBUTION_DATA[selectedYear] ||
    FALLBACK_CONTRIBUTION_DATA;

  const {
    totalContributions,
    currentStreak,
    bestStreak,
    daysWithPositions,
    monthSpans,
    lastUpdatedFormatted
  } = useMemo(() => {
    const days = activeData.contributions || [];

    // Calculate total contributions
    let total = 0;
    if (activeData.total) {
      if (selectedYear === 'last' && typeof activeData.total.lastYear === 'number') {
        total = activeData.total.lastYear;
      } else if (typeof activeData.total[selectedYear] === 'number') {
        total = activeData.total[selectedYear];
      }
    }
    if (!total) {
      total = days.reduce((acc, curr) => acc + curr.count, 0);
    }

    // Calculate streaks
    let best = 0;
    let current = 0;
    let temp = 0;

    for (let i = 0; i < days.length; i++) {
      if (days[i].count > 0) {
        temp++;
        if (temp > best) best = temp;
      } else {
        temp = 0;
      }
    }

    // Count backwards from latest day
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) {
        current++;
      } else if (i === days.length - 1 && selectedYear === 'last') {
        continue;
      } else {
        break;
      }
    }

    // Grid coordinates: 53 columns (cols 2..54), 7 rows (rows 2..8)
    const firstDate = days[0] ? new Date(days[0].date + 'T00:00:00') : new Date();
    const firstDow = firstDate.getDay(); // 0 = Sun

    const positionedDays = days.map((day, i) => {
      const dt = new Date(day.date + 'T00:00:00');
      const dow = dt.getDay();
      const weekIndex = Math.floor((firstDow + i) / 7);
      return {
        ...day,
        gridRow: dow + 2,
        gridColumn: weekIndex + 2
      };
    });

    // Month headers
    const spans: { name: string; col: string }[] = [];
    let curMonth = -1;
    let curStartCol = 2;
    let curMonthName = '';

    days.forEach((day, i) => {
      const dt = new Date(day.date + 'T00:00:00');
      const m = dt.getMonth();
      const weekIndex = Math.floor((firstDow + i) / 7);
      const col = weekIndex + 2;

      if (m !== curMonth) {
        if (curMonth !== -1) {
          if (col - curStartCol >= 2) {
            spans.push({
              name: curMonthName,
              col: `${curStartCol} / ${col}`
            });
          }
        }
        curMonth = m;
        curStartCol = col;
        curMonthName = dt.toLocaleString('en-US', { month: 'short' });
      }
    });

    if (55 - curStartCol >= 2) {
      spans.push({
        name: curMonthName,
        col: `${curStartCol} / 55`
      });
    }

    const lastDay = days[days.length - 1];
    const updatedStr = lastDay
      ? new Date(lastDay.date + 'T00:00:00').toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric'
        })
      : '28 Sept 2026';

    return {
      totalContributions: total,
      currentStreak: current,
      bestStreak: best,
      daysWithPositions: positionedDays,
      monthSpans: spans,
      lastUpdatedFormatted: updatedStr
    };
  }, [activeData, selectedYear]);

  return (
    <section id="activity" className="activity-section scroll-mt-16">
      {/* 1:1 Devendra Jat Section Header */}
      <div className="activity-header-row">
        <div className="activity-header-left">
          <span className="section-label">Activity</span>
          <p className="activity-header-subtitle">
            My recent open-source work and engineering activity.
          </p>
        </div>
        <div className="activity-header-right">
          <a
            href="https://github.com/nasifrhman"
            target="_blank"
            rel="noopener noreferrer"
            className="activity-gh-btn"
          >
            github <ArrowUpRight size={14} className="inline ml-1" />
          </a>
        </div>
      </div>

      <div className="mt-6 w-full text-left">
        {/* Heatmap Meta Header: Title & Updated date on left, Stats on right */}
        <div className="activity-meta-row">
          <div className="activity-meta-left">
            <p className="activity-meta-title">GitHub contribution heatmap</p>
            <p className="activity-meta-updated">
              updated {lastUpdatedFormatted}
            </p>
          </div>

          <div className="activity-meta-stats">
            <span>
              <strong className="font-semibold text-ink">{totalContributions}</strong> contributions
            </span>
            <span>current {currentStreak}</span>
            <span>best {bestStreak}</span>
          </div>
        </div>

        {/* GitHub-Style Year Filter starting from Left Side */}
        <div
          className="activity-years-container"
          role="group"
          aria-label="Filter contributions by year"
        >
          {AVAILABLE_YEARS.map((y) => {
            const isSelected = selectedYear === y.id;
            return (
              <button
                key={y.id}
                type="button"
                onClick={() => setSelectedYear(y.id)}
                className={`year-filter-btn ${isSelected ? 'is-active' : ''}`}
                aria-pressed={isSelected}
              >
                {y.label}
              </button>
            );
          })}
        </div>

        {/* 53-Week Calendar Grid matching devendrajat.com alignment */}
        <div className="activity-grid-scroll">
          <div
            className="activity-grid-table"
            style={{
              display: 'grid',
              width: '715px',
              minWidth: '715px',
              marginLeft: '0',
              columnGap: '3px',
              rowGap: '3px',
              gridTemplateColumns: '26px repeat(53, 10px)',
              gridTemplateRows: '18px repeat(7, 10px)'
            }}
          >
            {/* Month Labels in Row 1 */}
            {monthSpans.map((m, idx) => (
              <span
                key={`${m.name}-${idx}`}
                className="mono text-[10px] text-muted"
                style={{
                  gridRow: 1,
                  gridColumn: m.col,
                  justifySelf: 'center',
                  alignSelf: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                {m.name}
              </span>
            ))}

            {/* Day Labels in Col 1 (Mon, Wed, Fri) with sticky left positioning */}
            <span
              className="mono text-[10px] text-muted"
              style={{
                gridRow: 3,
                gridColumn: 1,
                position: 'sticky',
                left: 0,
                zIndex: 2,
                backgroundColor: 'var(--paper)'
              }}
            >
              Mon
            </span>
            <span
              className="mono text-[10px] text-muted"
              style={{
                gridRow: 5,
                gridColumn: 1,
                position: 'sticky',
                left: 0,
                zIndex: 2,
                backgroundColor: 'var(--paper)'
              }}
            >
              Wed
            </span>
            <span
              className="mono text-[10px] text-muted"
              style={{
                gridRow: 7,
                gridColumn: 1,
                position: 'sticky',
                left: 0,
                zIndex: 2,
                backgroundColor: 'var(--paper)'
              }}
            >
              Fri
            </span>

            {/* 53x7 Real GitHub Contribution Cells with GitHub Green Ramp */}
            {daysWithPositions.map((day) => {
              const countText = `${day.count} contribution${day.count === 1 ? '' : 's'} on ${day.date}`;
              return (
                <span
                  key={day.date}
                  title={countText}
                  className="transition-transform hover:scale-125"
                  style={{
                    gridRow: day.gridRow,
                    gridColumn: day.gridColumn,
                    width: '10px',
                    height: '10px',
                    borderRadius: '2px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    opacity: 1,
                    backgroundColor: GITHUB_HEAT_COLORS[day.level] || GITHUB_HEAT_COLORS[0]
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Legend and Scroll Hint */}
        <div className="activity-legend">
          <span>less</span>
          <span
            className="h-3 w-3"
            style={{
              borderRadius: '2px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              backgroundColor: GITHUB_HEAT_COLORS[0]
            }}
          />
          <span
            className="h-3 w-3"
            style={{
              borderRadius: '2px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              backgroundColor: GITHUB_HEAT_COLORS[1]
            }}
          />
          <span
            className="h-3 w-3"
            style={{
              borderRadius: '2px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              backgroundColor: GITHUB_HEAT_COLORS[2]
            }}
          />
          <span
            className="h-3 w-3"
            style={{
              borderRadius: '2px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              backgroundColor: GITHUB_HEAT_COLORS[3]
            }}
          />
          <span
            className="h-3 w-3"
            style={{
              borderRadius: '2px',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              backgroundColor: GITHUB_HEAT_COLORS[4]
            }}
          />
          <span>more</span>
          <span className="ml-2">scroll to see past ←</span>
        </div>

        {/* Section Bottom Border Divider */}
        <div className="mt-8 border-t border-[var(--rule)]" />
      </div>
    </section>
  );
};
