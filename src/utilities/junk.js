const one = {
  type: "element",
  name: "config",
  attributes: {
    version: "1.0",
    htmlParse: "false",
  },
  elements: [
    {
      type: "element",
      name: "item",
      attributes: {
        id: "studyTitle",
      },
      elements: [
        {
          type: "text",
          text: "Name of your study",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "textAlign",
      },
      elements: [
        {
          type: "text",
          text: "left",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "shuffleCards",
      },
      elements: [
        {
          type: "text",
          text: "true",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "loginrequired",
      },
      elements: [
        {
          type: "text",
          text: "false",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "loginPassword",
      },
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "loginUrl",
      },
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "loginUrlMethod",
      },
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "showStep3",
      },
      elements: [
        {
          type: "text",
          text: "true",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "showStep4",
      },
      elements: [
        {
          type: "text",
          text: "true",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "showStep5",
      },
      elements: [
        {
          type: "text",
          text: "true",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "disableBackButton",
      },
      elements: [
        {
          type: "text",
          text: "true",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "form",
      },
      elements: [
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
        {
          type: "element",
          name: "label",
          elements: [
            {
              type: "text",
              text: "Gender*",
            },
          ],
        },
        {
          type: "element",
          name: "note",
          elements: [
            {
              type: "text",
              text: "Please select your gender.",
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
              text: "female;male",
            },
          ],
        },
        {
          type: "element",
          name: "label",
          elements: [
            {
              type: "text",
              text: "Please answer the following questions.",
            },
          ],
        },
        {
          type: "element",
          name: "input",
          attributes: {
            type: "rating2",
            required: "false",
            scale: "Yes;No;",
          },
          elements: [
            {
              type: "text",
              text: "There's a car in my household;I own a car for myself",
            },
          ],
        },
        {
          type: "element",
          name: "label",
          elements: [
            {
              type: "text",
              text: "What kind of transportation do you use?",
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
              text: "Car;Railroad;Bike",
            },
          ],
        },
        {
          type: "element",
          name: "label",
          elements: [
            {
              type: "text",
              text: "What kind of transportation do you prefer?",
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
              text: "Car;Railroad;Bike",
            },
          ],
        },
        {
          type: "element",
          name: "label",
          elements: [
            {
              type: "text",
              text: "Comments",
            },
          ],
        },
        {
          type: "element",
          name: "input",
          attributes: {
            type: "textarea",
            required: "false",
          },
        },
        {
          type: "element",
          name: "note",
          attributes: {
            bg: "false",
          },
          elements: [
            {
              type: "text",
              text: "All fields marked with an * are mandatory.",
            },
          ],
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "submitUrl",
      },
      elements: [
        {
          type: "text",
          text: "exe.php?do=save",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "submitUrlMethod",
      },
      elements: [
        {
          type: "text",
          text: "firebase",
        },
      ],
    },
    {
      type: "element",
      name: "item",
      attributes: {
        id: "submitMail",
      },
      elements: [
        {
          type: "text",
          text: "yourdomain.com",
        },
      ],
    },
  ],
};
