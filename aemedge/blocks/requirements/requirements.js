/**
 * Set the status of the requirement based on the text content.
 * - Mandatory = mandatory
 * - Optional = optional
 * @param {Array} requirements The requirements to set the status for.
 */
function setRequirementStatus(requirements) {
  requirements.forEach((requirement) => {
    const status = requirement.textContent.toLowerCase();
    requirement.setAttribute('data-requirement-status', status);
  });
}

export default function decorate(block) {
  const requirements = [...block.querySelectorAll(':scope ol:has(li > em + strong) em')];
  setRequirementStatus(requirements);
}
