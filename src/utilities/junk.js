const data = [
  [
    {
      type: "element",
      name: "note",
      attributes: {
        bg: "true",
      },
      elements: [
        {
          type: "text",
          text: "All fields marked with an * are mandatory",
        },
      ],
    },
  ],
  [
    {
      type: "element",
      name: "label",
      elements: [
        {
          type: "text",
          text: "Age*",
        },
      ],
    },
    {
      type: "element",
      name: "note",
      elements: [
        {
          type: "text",
          text: "Please enter your year of birth (YYYY, eg. 1980).",
        },
      ],
    },
    {
      type: "element",
      name: "input",
      attributes: {
        type: "text",
        required: "true",
        maxlength: "4",
        restricted: "0-9",
      },
    },
  ],
  [
    {
      type: "element",
      name: "label",
      elements: [
        {
          type: "text",
          text: "Describe your experience using the iPads in this class*",
        },
      ],
    },
    {
      type: "element",
      name: "input",
      attributes: {
        type: "textarea",
        required: "true",
      },
    },
  ],
  [
    {
      type: "element",
      name: "label",
      elements: [
        {
          type: "text",
          text: "Year*",
        },
      ],
    },
    {
      type: "element",
      name: "note",
      elements: [
        {
          type: "text",
          text: "Please select your year",
        },
      ],
    },
    {
      type: "element",
      name: "input",
      attributes: {
        type: "radio",
        required: "true",
      },
      elements: [
        {
          type: "text",
          text: "Freshman;Sophomore;Junior;Senior",
        },
      ],
    },
  ],
  [
    {
      type: "element",
      name: "label",
      elements: [
        {
          type: "text",
          text: "What is your program focus?",
        },
      ],
    },
    {
      type: "element",
      name: "input",
      attributes: {
        type: "select",
        required: "false",
      },
      elements: [
        {
          type: "text",
          text: "Global Studies;Linguistics;English Literature",
        },
      ],
    },
  ],
  [
    {
      type: "element",
      name: "label",
      elements: [
        {
          type: "text",
          text: "What kind of class do you prefer?",
        },
      ],
    },
    {
      type: "element",
      name: "input",
      attributes: {
        type: "checkbox",
        required: "false",
      },
      elements: [
        {
          type: "text",
          text: "Lecture;Group Discussion;Active Learning",
        },
      ],
    },
  ],
  [
    {
      type: "element",
      name: "label",
      elements: [
        {
          type: "text",
          text: "Please respond to the following statements",
        },
      ],
    },
    {
      type: "element",
      name: "input",
      attributes: {
        type: "rating2",
        required: "false",
        scale: "Yes;No",
      },
      elements: [
        {
          type: "text",
          text: "I have used an iPad in class before.; I have used a notebook computer in class before.",
        },
      ],
    },
  ],
  [
    {
      type: "element",
      name: "label",
      elements: [
        {
          type: "text",
          text: "Please answer the following questions",
        },
      ],
    },
    {
      type: "element",
      name: "input",
      attributes: {
        type: "rating5",
        required: "false",
        scale: "1;2;3;4;5",
      },
      elements: [
        {
          type: "text",
          text: "How would you rate the use of iPads in this class?;How would you rate this class overall?",
        },
      ],
    },
  ],
  [
    {
      type: "element",
      name: "label",
      elements: [
        {
          type: "text",
          text: "Please answer the following questions",
        },
      ],
    },
    {
      type: "element",
      name: "input",
      attributes: {
        type: "rating10",
        required: "false",
        scale: "1;2;3;4;5;6;7;8;9;10",
      },
      elements: [
        {
          type: "text",
          text: "How would you rate the use of the Socrative website in this class?;How would you rate the use of the Quizlet website in this class?",
        },
      ],
    },
  ],
];
