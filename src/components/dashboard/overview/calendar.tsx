'use client'
import * as React from 'react';
import { ScheduleComponent, Inject, Agenda, Day, Month, Week, WorkWeek } from '@syncfusion/ej2-react-schedule';
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx3THxbf1x0ZFxMYVhbRXBPMyBoS35RckVgW39fcHVXR2RYUUN3');

export function Calendar(): React.JSX.Element {
  return (
    <ScheduleComponent >
      <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
    </ScheduleComponent>
  );
}

export default Calendar;
