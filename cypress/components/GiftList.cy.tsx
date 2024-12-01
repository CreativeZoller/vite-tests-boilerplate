/// <reference types="cypress" />

import React from "react";
import GiftList from "./../../src/components/GiftList";
import type { GiftItem } from "./../../src/types";
import { mount } from "@cypress/react18";


describe("<GiftList>", () => {
  const sampleGifts: GiftItem[] = [
    { id: "1", name: "Teddy Bear", purchased: false, priority: 1 },
    { id: "2", name: "Bicycle", purchased: true, priority: 2 },
    { id: "3", name: "Toy Car", purchased: false, priority: 3 },
  ];
  
  it("mounts", () => {
    mount(
      <GiftList
        gifts={sampleGifts}
        onGiftToggle={cy.stub()}
        onGiftRemove={cy.stub()}
        onReorder={cy.stub()}
      />
    );
  });
});

describe("GiftList Component", () => {
  const sampleGifts: GiftItem[] = [
    { id: "1", name: "Teddy Bear", purchased: false, priority: 1 },
    { id: "2", name: "Bicycle", purchased: true, priority: 2 },
    { id: "3", name: "Toy Car", purchased: false, priority: 3 },
  ];

  it("renders the gift list correctly", () => {
    mount(
      <GiftList
        gifts={sampleGifts}
        onGiftToggle={cy.stub()}
        onGiftRemove={cy.stub()}
        onReorder={cy.stub()}
      />
    );

    cy.get("li").should("have.length", sampleGifts.length);
    cy.get("li").first().should("contain.text", "Teddy Bear");
    cy.get("li")
      .eq(1)
      .should("contain.text", "Bicycle")
      .and("have.class", "bg-green-50");
    cy.get("li").eq(2).should("contain.text", "Toy Car");
    // add priority check too
  });

  it("toggles the purchased status of a gift", () => {
    const onGiftToggleSpy = cy.spy().as("onGiftToggleSpy");
    mount(
      <GiftList
        gifts={sampleGifts}
        onGiftToggle={onGiftToggleSpy}
        onGiftRemove={cy.stub()}
        onReorder={cy.stub()}
      />
    );

    cy.get("li").first().find("button").first().click();
    cy.get("@onGiftToggleSpy").should(
      "have.been.calledOnceWith",
      sampleGifts[0].id
    );
  });

  it("removes a gift when delete is clicked", () => {
    const onGiftRemoveSpy = cy.spy().as("onGiftRemoveSpy");
    mount(
      <GiftList
        gifts={sampleGifts}
        onGiftToggle={cy.stub()}
        onGiftRemove={onGiftRemoveSpy}
        onReorder={cy.stub()}
      />
    );

    cy.get("li").eq(1).find("button").last().click();
    cy.get("@onGiftRemoveSpy").should(
      "have.been.calledOnceWith",
      sampleGifts[1].id
    );
  });

  it("reorders gifts via drag-and-drop", () => {
    const onReorderSpy = cy.spy().as("onReorderSpy");
    mount(
      <GiftList
        gifts={sampleGifts}
        onGiftToggle={cy.stub()}
        onGiftRemove={cy.stub()}
        onReorder={onReorderSpy}
      />
    );

    // Ensure the items are rendered and draggable
    cy.get("li").should("have.length", sampleGifts.length);

    // Drag the first item and drop it in the second position
    cy.get("li").first().as("firstItem"); // Alias for the first item
    cy.get("li").eq(1).as("secondItem"); // Alias for the second item

    cy.get("@firstItem").trigger("dragstart"); // Start dragging
    cy.get("@secondItem").trigger("drop"); // Drop into the second position
  });

});
