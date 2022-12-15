import React from "react";
import events from "./appointments";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views).map(
    (k) => BigCalendar.Views[k]
);

function DemoScheduler() {
    return <div style={{ height: 700 }}>
        <BigCalendar
            events={events}
            step={60}
            views={allViews}
            defaultDate={new Date(2022, 11, 15)}
            popup={true}
            onShowMore={(events, date) => {
                console.log(events)
                this.setState({ showModal: true, events })
            }}
        />
    </div>
}

export default DemoScheduler;
