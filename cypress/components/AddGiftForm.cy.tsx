/// <reference types="cypress" />

import React from "react";
import AddGiftForm from "./../../src/components/AddGiftForm";
import { mount } from "@cypress/react18";

describe("<AddGiftForm>", () => {
  it("mounts", () => {
    mount(<AddGiftForm onAdd={cy.stub()} />);
  });
});

describe("AddGiftForm Component", () => {
  it("renders the input and button correctly", () => {
    mount(<AddGiftForm onAdd={cy.stub()} />);
    cy.get('input[placeholder="Add a gift..."]').should("exist");
    cy.get("button").contains("Add Gift").should("exist");
  });

  it("allows typing in the input field", () => {
    mount(<AddGiftForm onAdd={cy.stub()} />);
    const testInput = "Teddy Bear";
    cy.get("input").type(testInput).should("have.value", testInput);
  });

  it("calls onAdd with the correct value when the form is submitted", () => {
    const onAddSpy = cy.spy().as("onAddSpy");
    mount(<AddGiftForm onAdd={onAddSpy} />);

    const testInput = "Teddy Bear";
    cy.get("input").type(testInput);
    cy.get("button").click();

    cy.get("@onAddSpy").should("have.been.calledOnceWith", testInput.trim());
    cy.get("input").should("have.value", "");
  });

  it("does not call onAdd when the input is empty", () => {
    const onAddSpy = cy.spy().as("onAddSpy");
    mount(<AddGiftForm onAdd={onAddSpy} />);

    cy.get("button").click();
    cy.get("@onAddSpy").should("not.have.been.called");
  });
});
