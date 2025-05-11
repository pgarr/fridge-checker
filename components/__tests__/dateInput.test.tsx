import { render, fireEvent } from "@testing-library/react-native";
import DateInput from "../dateInput";
import React from "react";

describe("DateInput Component", () => {
  it("renders correctly with a given date", () => {
    const mockSetDate = jest.fn();
    const { getByText } = render(
      <DateInput
        date={new Date("2023-01-01")}
        setDate={mockSetDate}
        style={{}}
      />
    );

    expect(getByText("1/1/2023")).toBeTruthy();
  });

  it("renders correctly without a date", () => {
    const mockSetDate = jest.fn();
    const { getByText } = render(
      <DateInput date={undefined} setDate={mockSetDate} style={{}} />
    );

    expect(getByText("Invalid Date")).toBeTruthy();
  });

  it("opens DateTimePicker when Pressable is pressed", () => {
    const mockSetDate = jest.fn();
    const { getByText, getByTestId } = render(
      <DateInput
        date={new Date("2023-01-01")}
        setDate={mockSetDate}
        style={{}}
      />
    );

    fireEvent.press(getByText("1/1/2023"));
    expect(getByTestId("dateTimePicker")).toBeTruthy();
  });

  it("calls setDate with the selected date", () => {
    const mockSetDate = jest.fn();
    const { getByText, getByTestId } = render(
      <DateInput
        date={new Date("2023-01-01")}
        setDate={mockSetDate}
        style={{}}
      />
    );

    fireEvent.press(getByText("1/1/2023"));
    fireEvent(getByTestId("dateTimePicker"), "onChange", {
      nativeEvent: {},
      type: "set",
    }, new Date("2023-02-01"));

    expect(mockSetDate).toHaveBeenCalledWith(new Date("2023-02-01"));
  });
});