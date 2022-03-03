export default function activityDropDown() {
  const activities = [
    "Education",
    "Recreational",
    "Social",
    "DIY",
    "Charity",
    "Cooking",
    "Relaxation",
    "Music",
    "Busywork",
  ];
  let html = "<option>Type of Activity</option>";
  activities.forEach(a => {
    html += `<option value="${a.toLowerCase()}">${a}</option>`;
  });
  return html;
}
