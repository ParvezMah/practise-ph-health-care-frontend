const PatientDashboardPage = () => {
  return <div>PatientDashboardPage</div>;
};

export default PatientDashboardPage;

/*

Public Routes
    Open Publice Routes: /, /about, /doctores/doctorId
    Auth Routes: /login, /register


Protected Routes
    Common Protected Routes: /my-profile, /settings, /change-password, /my-profile/*
    Role Based Routes: /dashboard/* (Patient), /doctor/dashboard/* /doctor/routine/*, /assistants (Doctor), /admin/dashboard/* (admin)

Exact Path Match
Router Pattern Match (/doctor/*)

*/