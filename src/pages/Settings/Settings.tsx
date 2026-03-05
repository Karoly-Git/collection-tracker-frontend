import { Switch, Select, SegmentedControl } from "@mantine/core";
import { useState } from "react";
import "./Settings.scss";

export default function Settings() {

    const [todayChecked, setTodayChecked] = useState(true);
    const [keepFilters, setKeepFilters] = useState(true);

    const [theme, setTheme] = useState("system");

    const [notificationTime, setNotificationTime] = useState("1");
    const [browserNotifications, setBrowserNotifications] = useState(true);
    const [soundNotifications, setSoundNotifications] = useState(false);

    const [defaultOrderBy, setDefaultOrderBy] = useState("time");
    const [orderDirection, setOrderDirection] = useState("newest");
    const [rowsPerPage, setRowsPerPage] = useState("25");

    const [autoRefresh, setAutoRefresh] = useState(true);
    const [refreshInterval, setRefreshInterval] = useState("30");

    const [compactTable, setCompactTable] = useState(false);

    const [defaultReportRange, setDefaultReportRange] = useState("today");

    const [keyboardShortcuts, setKeyboardShortcuts] = useState(true);
    const [showTooltips, setShowTooltips] = useState(true);

    return (
        <div className="settings">

            <h1 className="settings__title">Settings</h1>

            <div className="settings__card">

                {/* GENERAL */}

                <div className="settings__item">
                    <Switch
                        label="Today's collections checked by default"
                        checked={todayChecked}
                        onChange={(event) =>
                            setTodayChecked(event.currentTarget.checked)
                        }
                    />
                </div>

                <div className="settings__item">
                    <Switch
                        label="Keep filters after browser refresh"
                        checked={keepFilters}
                        onChange={(event) =>
                            setKeepFilters(event.currentTarget.checked)
                        }
                    />
                </div>

                <div className="settings__item">
                    <Switch
                        label="Auto refresh collections table"
                        checked={autoRefresh}
                        onChange={(event) =>
                            setAutoRefresh(event.currentTarget.checked)
                        }
                    />
                </div>

                <div className="settings__item">
                    <Select
                        label="Auto refresh interval"
                        value={refreshInterval}
                        onChange={(value) => setRefreshInterval(value!)}
                        data={[
                            { value: "15", label: "15 seconds" },
                            { value: "30", label: "30 seconds" },
                            { value: "60", label: "1 minute" },
                        ]}
                    />
                </div>

                {/* APPEARANCE */}

                <div className="settings__item">
                    <label>Theme</label>

                    <SegmentedControl
                        value={theme}
                        onChange={setTheme}
                        data={[
                            { label: "Bright", value: "light" },
                            { label: "Dark", value: "dark" },
                            { label: "Device", value: "system" },
                        ]}
                    />
                </div>

                <div className="settings__item">
                    <Switch
                        label="Compact table mode"
                        checked={compactTable}
                        onChange={(event) =>
                            setCompactTable(event.currentTarget.checked)
                        }
                    />
                </div>

                {/* NOTIFICATIONS */}

                <div className="settings__item">
                    <Select
                        label="Notify if lorry wait exceeds"
                        value={notificationTime}
                        onChange={(value) => setNotificationTime(value!)}
                        data={[
                            { value: "1", label: "1 hour" },
                            { value: "2", label: "2 hours" },
                            { value: "3", label: "3 hours" },
                        ]}
                    />
                </div>

                <div className="settings__item">
                    <Switch
                        label="Enable browser notifications"
                        checked={browserNotifications}
                        onChange={(event) =>
                            setBrowserNotifications(event.currentTarget.checked)
                        }
                    />
                </div>

                <div className="settings__item">
                    <Switch
                        label="Play notification sound"
                        checked={soundNotifications}
                        onChange={(event) =>
                            setSoundNotifications(event.currentTarget.checked)
                        }
                    />
                </div>

                {/* TABLE */}

                <div className="settings__item">
                    <Select
                        label="Collection table default ordering column"
                        value={defaultOrderBy}
                        onChange={(value) => setDefaultOrderBy(value!)}
                        data={[
                            { value: "time", label: "Time" },
                            { value: "customer", label: "Customer" },
                            { value: "status", label: "Status" },
                        ]}
                    />
                </div>

                <div className="settings__item">
                    <Select
                        label="Collection table ordering direction"
                        value={orderDirection}
                        onChange={(value) => setOrderDirection(value!)}
                        data={[
                            { value: "newest", label: "Newest first" },
                            { value: "oldest", label: "Oldest first" },
                        ]}
                    />
                </div>

                <div className="settings__item">
                    <Select
                        label="Rows per page"
                        value={rowsPerPage}
                        onChange={(value) => setRowsPerPage(value!)}
                        data={[
                            { value: "10", label: "10 rows" },
                            { value: "25", label: "25 rows" },
                            { value: "50", label: "50 rows" },
                        ]}
                    />
                </div>

                {/* REPORTS */}

                <div className="settings__item">
                    <Select
                        label="Default report range"
                        value={defaultReportRange}
                        onChange={(value) => setDefaultReportRange(value!)}
                        data={[
                            { value: "today", label: "Today" },
                            { value: "week", label: "This week" },
                            { value: "month", label: "This month" },
                            { value: "year", label: "This year" },
                        ]}
                    />
                </div>

                {/* USER EXPERIENCE */}

                <div className="settings__item">
                    <Switch
                        label="Enable keyboard shortcuts"
                        checked={keyboardShortcuts}
                        onChange={(event) =>
                            setKeyboardShortcuts(event.currentTarget.checked)
                        }
                    />
                </div>

                <div className="settings__item">
                    <Switch
                        label="Show tooltips"
                        checked={showTooltips}
                        onChange={(event) =>
                            setShowTooltips(event.currentTarget.checked)
                        }
                    />
                </div>

            </div>

        </div>
    );
}