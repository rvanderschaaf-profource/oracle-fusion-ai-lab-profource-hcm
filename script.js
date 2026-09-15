const notes = [
  'Sign in with the username and password assigned to you. Your home page may look slightly different.',
  'Navigate to Tools > AI Agent Studio.',
  'In this lab, you will build an AI agent that creates new locations.\n\nThe agent uses Business Object tools to securely search Fusion data en create/update Fusion data.',
  'The required business objects and tools already exists. Navigate to Resources > Business Object.',
  'Search for the [RVS_LOCATIONS] Business Object.\n\nDo not change the object, you can use them for review (by clicking on the pencil) but you need to create your own Object.', 
  'Go back to Business Objects > Click on Add > Fill in the details:',
  'Click on Add from Specification > Select \'/locationsV2\' > getall_locationsV2:',
  'Create another function that is able to create the location.\n\nOracle Location API Documentation: https://docs.oracle.com/en/cloud/saas/human-resources/farws/api-locations-v2.html\n\nThe steps are similair to the previous step.\n\nWe will  provide you a sample payload which you need for the configuration, but feel free to use your own payload to add additional fields like the address details for example:',
  'Navigate to Resources > Tools > Add > Fill in the following details:',
  'Now create the agent. Navigate to Resources > Agents.',
  'Click Add.',
  'Enter the following agent details.',
  'Add the tool. Search for [YOUR_TOOL_CODE] and [MultiFileProcessor].\n\nThe MultiFileProcessor tool is a seeded tool and needed for the agent to be able to understand document uploads.',
  'Hover over the tool and click Add to Agent.',
  'The tool is now part of the agent. Select the agent to add the prompt and other settings.',
  'Select Prompts.',
  'This prompt includes the required tool calls, selection logic, and guardrails. Paste it into the Prompt field.',
  'Go to LLM > Make sure to select the basic [OSS} LLM.\n\nGo back to Prompts > Set Summarization mode to Custom. Add the following text below the [answer requirements] section.',
  'Click Create & Close.',
  'The agent is ready. Next, create a workflow to test it. Copy your agent code, then select AI Agent Studio.',
  'Use Ask Oracle to generate the workflow. First switch the scope from Applications to Workflows: remove Applications by clicking its x.',
  'Select Workflows.',
  'Enter the following in Ask Oracle.\n\nThe screenshot uses [RS001_SUPPLIER_HANDLER_AGENT] as an example. In the text you copy below, replace YOUR_AGENT_CODE with the code of the agent you created.',
  'Click Yes for each approval request until the workflow is created.\n\nThe file-upload can be manually enabled by going to the settings > chat experience > enable file upload.',
  'Click Debug, enter the following question and upload one of the sample attachments to create a new location.',
  '',
];

const titles = [
  'Sign in', 'Open AI Agent Studio', 'Lab overview', 'Review available business objects', 'Find the relevant business objects', 'Create new business object', 'Create new function within business object (1/2)', 'Create new function within business object (2/2)', 'Create new tool', 'Open Agents', 'Start a new agent', 'Enter agent details', 'Find the relevant tool', 'Add the tool to the agent', 'Configure the agent', 'Open Prompts', 'Add the agent prompt', 'Add the summarization prompt', 'Save the agent', 'Prepare the workflow', 'Switch to Workflows', 'Select Workflows', 'Request workflow generation','Approve workflow creation','Debug the agent','End of Lab'
];

const locationPrompt = `Analyze {{$context.$system.$inputMessage}} and identify the fields:

- [locationName]
- [addressline1]
- [addressline2]
- [city]
- [postalcode]
- [country]

Generate a [LocationCode] based on the [locationName] field.

In case of a delivered attachment, use the tool [MultiFileProcessor] to read and understand the attachment to identify the same fields.

Use [locationName] to check if the location already exists. You can use the function [RS001_get_location] from the tool [RS001_Locations] for this.

If location already exists, then stop the agent and do not use any tools. Return with a deeplink to the location: Make a clickable deeplink to the location page. Link to use: https://fa-esdr-dev3-saasfademo1.ds-fa.oraclepdemos.com/fscmUI/redwood/locations?effectiveDate=4712-12-31&LocationId=[LocationId] -- This last LocationId must be filled based on the response of the [RS001_get_location] tool function.

If location does not exists, then use the function [RS001_create_location] from the tool [RS001_Locations] to create this new location. Return with a deeplink to the location: Make a clickable deeplink to the location page. Link to use: https://fa-esdr-dev3-saasfademo1.ds-fa.oraclepdemos.com/fscmUI/redwood/locations?effectiveDate=4712-12-31&LocationId=[LocationId] -- This last LocationId must be filled based on the response of the [RS001_create_location] tool function.

The deeplink must be rendered as an HTML anchor element with target="_blank" so that the browser opens the location page in a new tab`;

const copyText = {
  6: 'Business Object Name: [Your initials][number] Location Object\nFamily: Common\nModule: Other\nDescription: A business object that searches for location data and creates new locations\nResource Type: Monolith resource\nResource Path: /hcmRestApi/resources/11.13.18.05/locationsV2',
  7: 'Function Name: [Your initials][number]_get_location\nDescription: A function to retrieve location data.\nOperation Type: Get\nUse Native Authentication: Yes\nResource Path: ?q=LocationName LIKE \'%{locationName}%\' or LIKE \'{locationName}%\' or LIKE \'%{locationName}\'\'\nHeader: REST-Framework-Version=1\n\n\nMake sure to fill in the rest of the required fields, you can use AI (generate or fetch sample data buttons) to fill these records.',
  8:'{\n"LocationCode" : "{locationCode}",\n"LocationName" : "{locationName}",\n"ActiveStatus" : "A",\n"SetCode" : "COMMON",\n"addresses" : [\n{\n"AddressUsageType" : "MAIN",\n"AddressLine1" : "{addressLine1}",\n"AddressLine2" : "{addressLine2}",\n"TownOrCity" : "{city}",\n"Country" : "{country}",\n"PostalCode" : "{postalCode}"\n}\n]\n}',
  9:'Tool Type: Business Object\nTool Name: [Your initials][number]_Locations\nFamily: Common\nModule: Other\nDescription: A tool to retrieve and create location data.\nRequire Human Approval: Off\nBusiness Object: [YOUR_BO_CODE]\n\nSelect both functions.',
  12:'Agent Name: [Your initials][number] Location Handler Agent\nFamily: Common\nModule: Other\nDescription: An agent that can query on location data and can create new locations.',
  17: locationPrompt,
  18: 'Return the response in HTML, add light colours since the background is dark and add html tag icons to the response text.',
  23: 'Create a workflow agent based on the just created agent YOUR_AGENT_CODE. The workflow should pass the user input to the agent. It is a reusable agent, allowing the creation of locations. Enable the file upload option in the settings menu of the workflow agent, setup is in chat experience.',
  25: 'Create a new location based on the attached file.',
};

const downloadableDocuments = [
  {
    file: 'SampleLocation1.pdf',
    label: 'Location - Already Exists'
  },
  {
    file: 'SampleLocation2.pdf',
    label: 'Location - Create sample 1'
  },
  {
    file: 'SampleLocation3.pdf',
    label: 'Location - Create sample 2'
  },
  {
    file: 'SampleLocation4.pdf',
    label: 'Location - Create sample 3'
  },
  {
    file: 'SampleLocation5.pdf',
    label: 'Location - Create sample 4'
  },
  {
    file: 'SampleLocation6.pdf',
    label: 'Location - Create sample 5'
  },
  {
    file: 'SampleLocation7.pdf',
    label: 'Location - Create sample 6'
  }
];

const escapeHtml = (text) =>
  text.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  })[char]);

const steps = document.getElementById('steps');
const contents = document.getElementById('contents');

for (let slide = 1; slide <= titles.length; slide += 1) {
  const section = document.createElement('section');

  section.className = 'lab-step';
  section.id = `slide-${slide}`;

  const noteHtml = notes[slide - 1]
    ? notes[slide - 1]
        .split('\n\n')
        .map(
          (paragraph) =>
            `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`
        )
        .join('')
    : '';

  let visual;

  if (slide === titles.length) {
    visual = '<div class="empty-slide" aria-label="Blank final step"></div>';
  } else {
    visual = `
      <img
        class="slide-shot"
        src="assets/slides/${String(slide).padStart(2, '0')}.png"
        alt="Step ${slide}: ${escapeHtml(titles[slide - 1])}"
      >
    `;
  }

  const copy = copyText[slide]
    ? `
      <div class="copy-block">
        <div class="copy-head">
          <span>Text to enter</span>
          <button type="button" data-copy="${slide}">Copy</button>
        </div>
        <pre>${escapeHtml(copyText[slide])}</pre>
      </div>
    `
    : '';

 const resource = slide === 25
  ? `
    <div class="document-link">
      <p><strong>Download a sample location creation request:</strong></p>

      ${downloadableDocuments
        .map(
          (doc) => `
            <a
              href="assets/documents/${encodeURIComponent(doc.file)}"
              target="_blank"
              rel="noopener"
              style="
                display: block;
                width: 320px;
                margin-bottom: 10px;
                padding: 10px 14px;
                color: #fff;
                background: #005e68;
                border-radius: 4px;
                font-size: 0.9rem;
                font-weight: 750;
                text-decoration: none;
              "
            >
              ${escapeHtml(doc.label)}
            </a>
          `
        )
        .join('')}
    </div>
  `
  : '';

  section.innerHTML = `
    <div class="number">Step ${slide}</div>

    <div class="step-content">
      <h2>${escapeHtml(titles[slide - 1])}</h2>

      <div class="notes">
        ${noteHtml}
        ${resource}
      </div>

      ${copy}

      ${visual}
    </div>
  `;

  steps.append(section);

  const link = document.createElement('a');

  link.href = `#slide-${slide}`;
  link.textContent = slide;
  link.setAttribute(
    'aria-label',
    `Go to step ${slide}: ${titles[slide - 1]}`
  );

  contents.append(link);
}

document.querySelectorAll('[data-copy]').forEach((button) => {
  button.addEventListener('click', async () => {
    const text = copyText[button.dataset.copy];

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
    } catch {
      button.textContent = 'Select text';
    }

    window.setTimeout(() => {
      button.textContent = 'Copy';
    }, 1600);
  });
});
