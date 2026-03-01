import { PHONE_NUMBER, WIDGET_LINK, EMAIL_ADDRESS, REFERRAL_LINK } from './resource';

export interface ChatNode {
  text: string;
  type?: string;
  action?: string;
  actionType?: "call" | "link" | "email";
  actionValue?: string;
  options?: Array<{ label: string; next: string }>;
}

export interface ChatTree {
  [key: string]: ChatNode;
}

export const chatbotTree: ChatTree = {
  "start": {
    "text": "Hi! To get started, let us know who you are.",
    "options": [
      { "label": "Healthcare Provider", "next": "clinician" },
      { "label": "Client", "next": "status" }
    ]
  },
  "clinician": {
    "text": "For referrals, please fill and submit the referral form.",
    "type": "terminal",
    "action": " Referral Form",
    "actionType": "link",
    "actionValue": REFERRAL_LINK
  },
  "status": {
    "text": "Are you a new or existing client?",
    "options": [
      { "label": "New Client", "next": "location" },
      { "label": "Existing Client", "next": "existing_intent" }
    ]
  },
  "existing_intent": {
    "text": "How can we help you today?",
    "options": [
      { "label": "New Service", "next": "location" },
      { "label": "Billing / Scheduling", "next": "admin" }
    ]
  },
  "admin": {
    "text": "For billing or existing appointments, please contact our office.",
    "type": "terminal",
    "action": "Call Office",
    "actionType": "call",
    "actionValue": PHONE_NUMBER
  },
  "location": {
    "text": "Which state do you reside in?",
    "options": [
      { "label": "Kentucky", "next": "ky_service" },
      { "label": "Psypact State*", "next": "out_service" },
      { "label": "Other State", "next": "reject" }
    ]
  },
  "ky_service": {
    "text": "What type of care are you seeking?",
    "options": [
      { "label": "Therapy / Meds", "next": "final" },
      { "label": "Testing", "next": "final" }
    ]
  },
  "out_service": {
    "text": "What type of care are you seeking?",
    "options": [
      { "label": "Therapy / Meds", "next": "reject" },
      { "label": "Testing", "next": "final" }
    ]
  },
  "final": {
    "text": "Great! Let's talk to get you assigned to the right clinician.",
    "type": "terminal",
    "action": "Get Intake Documents",
    "actionType": "link",
    "actionValue": WIDGET_LINK
  },
  "reject": {
    "text": "We're sorry, but we cannot provide the requested service in your state.",
    "type": "terminal",
    "action": "Email Support",
    "actionType": "email",
    "actionValue": EMAIL_ADDRESS
  }
};
