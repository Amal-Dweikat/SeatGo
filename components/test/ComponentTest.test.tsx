import React from "react";
import { render, fireEvent, screen } from "@testing-library/react-native";
import ChooseDate from "../ChooseDateRepeat";

describe("ChooseDate Component", () => {

    const mockSetSelectedDays = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders all days", () => {

        render(
            <ChooseDate
                selectedDays={[]}
                setSelectedDays={mockSetSelectedDays}
            />
        );

        expect(screen.getByText("Sun")).toBeTruthy();
        expect(screen.getByText("Mon")).toBeTruthy();
        expect(screen.getByText("Tue")).toBeTruthy();
    });

    it("calls setSelectedDays when a day is pressed", () => {

        render(
            <ChooseDate
                selectedDays={[]}
                setSelectedDays={mockSetSelectedDays}
            />
        );

        fireEvent.press(screen.getByText("Mon"));

        expect(mockSetSelectedDays).toHaveBeenCalled();
    });

});