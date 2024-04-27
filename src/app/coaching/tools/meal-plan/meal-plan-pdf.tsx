"use client";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
} from "@react-pdf/renderer";
import { type CoachingMealPlanData } from "./useCoachingMealPlanState";
import { calculateMealTotals, getMealPlanTotals } from "./helpers";
import { showDecimalIfNotZero } from "@/lib/utils";
import React from "react";

Font.register({
  family: "Inter",
  fonts: [
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
      fontWeight: 100,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
      fontWeight: 200,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
      fontWeight: 300,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
      fontWeight: 400,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
      fontWeight: 500,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
      fontWeight: 600,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
      fontWeight: 700,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
      fontWeight: 800,
    },
    {
      src: "http://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
      fontWeight: 900,
    },
  ],
});

export interface GetMealPlanDocumentProps
  extends Omit<CoachingMealPlanData, "selectClientDialog"> {
  authorName: string;
}

export const GetMealPlanDocument = (data: GetMealPlanDocumentProps) => {
  const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: "Inter" },
    mainHeader: { fontSize: 45, fontWeight: 700 },
    separator: {
      marginTop: 18,
      marginBottom: 18,
      borderBottom: 2,
      borderColor: "#dedcdc",
      borderRadius: 5,
    },
    infoWrapper: {
      paddingLeft: 15,

      fontSize: 14,
    },
    semiBold: {
      fontWeight: 500,
    },
    summaryWrapper: {
      paddingLeft: 15,
      fontSize: 14,
    },
    descriptionWrapper: {
      paddingLeft: 15,
      fontSize: 14,
    },
    mealWrapper: {
      paddingLeft: 15,
      fontSize: 14,
    },
    textMargin: {
      paddingTop: 2,
    },
    mealHeader: { fontSize: 30, fontWeight: 700 },
    subHeader: {
      fontFamily: "Inter",
      fontSize: 18,
      fontWeight: 600,
    },
    tableHeader: {
      fontSize: 12,
      textTransform: "uppercase",
      fontWeight: 500,
    },
    tableData: {
      fontSize: 12,
    },
  });
  const getMetaData = () => {
    if (
      data.includeAuthor ||
      data.selectedClient ||
      data.startDate ||
      data.endDate
    ) {
      return (
        <>
          <View style={styles.infoWrapper}>
            {data.startDate && (
              <Text>
                <Text style={[styles.semiBold]}>Startdatum:</Text>{" "}
                {data.startDate}
              </Text>
            )}

            {data.endDate && (
              <Text style={styles.textMargin}>
                <Text style={[styles.semiBold]}>Slutdatum:</Text> {data.endDate}
              </Text>
            )}

            {data.selectedClient && (
              <Text style={styles.textMargin}>
                <Text style={[styles.semiBold]}>Klient:</Text>{" "}
                {data.selectedClient?.name}
              </Text>
            )}

            {data.includeAuthor && (
              <Text style={styles.textMargin}>
                <Text style={[styles.semiBold]}>Coach:</Text> {data.authorName}
              </Text>
            )}
          </View>
          <View style={styles.separator} />
        </>
      );
    } else return null;
  };
  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Text style={styles.mainHeader}>{data.name}</Text>

        <View style={styles.separator} />

        {getMetaData()}

        <View>
          <Text style={styles.subHeader}>Summering</Text>

          <View style={styles.summaryWrapper}>
            <Text
              style={{
                marginTop: 5,
              }}
            >
              <Text style={styles.semiBold}>Antal måltider:</Text>{" "}
              {data.meals.length} st
            </Text>

            <Text style={styles.textMargin}>
              <Text style={styles.semiBold}>Protein:</Text>{" "}
              {showDecimalIfNotZero(getMealPlanTotals(data.meals).protein)} g
            </Text>
            <Text style={styles.textMargin}>
              <Text style={styles.semiBold}>Kolhydrater:</Text>{" "}
              {showDecimalIfNotZero(getMealPlanTotals(data.meals).carbs)} g
            </Text>
            <Text style={styles.textMargin}>
              <Text style={styles.semiBold}>Fett:</Text>{" "}
              {showDecimalIfNotZero(getMealPlanTotals(data.meals).fat)} g
            </Text>
            <Text style={styles.textMargin}>
              <Text style={styles.semiBold}>Kalorier:</Text>{" "}
              {showDecimalIfNotZero(getMealPlanTotals(data.meals).calories, 0)}{" "}
              kcal
            </Text>
          </View>
        </View>

        {data.description && (
          <>
            <View style={styles.separator} />

            <Text style={styles.subHeader}>Övrig information</Text>

            <View style={styles.descriptionWrapper}>
              <Text style={[styles.textMargin]}>{data.description}</Text>
            </View>
          </>
        )}
      </Page>

      {data.meals.map((meal, index) => (
        <React.Fragment key={index}>
          <Page style={styles.page} size="A4">
            <Text style={styles.mainHeader}>{meal.name}</Text>
            <View style={styles.separator} />

            <Text style={styles.subHeader}>Totalt</Text>

            <View style={styles.mealWrapper}>
              <Text style={styles.textMargin}>
                <Text style={styles.semiBold}>Protein:</Text>{" "}
                {showDecimalIfNotZero(calculateMealTotals(meal).totalProtein)} g
              </Text>
              <Text style={styles.textMargin}>
                <Text style={styles.semiBold}>Kolhydrater:</Text>{" "}
                {showDecimalIfNotZero(calculateMealTotals(meal).totalCarbs)} g
              </Text>
              <Text style={styles.textMargin}>
                <Text style={styles.semiBold}>Fett:</Text>{" "}
                {showDecimalIfNotZero(calculateMealTotals(meal).totalFat)} g
              </Text>
              <Text style={styles.textMargin}>
                <Text style={styles.semiBold}>Kalorier:</Text>{" "}
                {showDecimalIfNotZero(calculateMealTotals(meal).totalCalories)}{" "}
                g
              </Text>
            </View>

            <View style={styles.separator} />

            <View
              style={{
                borderBottom: 1,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  styles.tableHeader,
                  {
                    width: "30%",
                  },
                ]}
              >
                Namn
              </Text>
              <Text style={[styles.tableHeader, { width: "12%" }]}>Mängd</Text>
              <Text style={[styles.tableHeader, { width: "13%" }]}>
                Protein
              </Text>
              <Text style={[styles.tableHeader, { width: "20%" }]}>
                Kolhydrater
              </Text>
              <Text style={[styles.tableHeader, { width: "10%" }]}>Fett</Text>
              <Text style={[styles.tableHeader, { width: "15%" }]}>
                Kalorier
              </Text>
            </View>

            {meal.foods.map((food, i) => (
              <View
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    styles.tableData,
                    {
                      width: "30%",
                    },
                  ]}
                >
                  {food.name}
                </Text>
                <Text
                  style={[
                    styles.tableData,
                    {
                      width: "12%",
                    },
                  ]}
                >
                  {showDecimalIfNotZero(food.calculatedAmount, 0)} {food.unit}
                </Text>
                <Text
                  style={[
                    styles.tableData,
                    {
                      width: "13%",
                    },
                  ]}
                >
                  {showDecimalIfNotZero(food.calculatedProtein)} g
                </Text>
                <Text
                  style={[
                    styles.tableData,
                    {
                      width: "20%",
                    },
                  ]}
                >
                  {showDecimalIfNotZero(food.calculatedCarbs)} g
                </Text>
                <Text
                  style={[
                    styles.tableData,
                    {
                      width: "10%",
                    },
                  ]}
                >
                  {showDecimalIfNotZero(food.calculatedFat)} g
                </Text>
                <Text
                  style={[
                    styles.tableData,
                    {
                      width: "15%",
                    },
                  ]}
                >
                  {showDecimalIfNotZero(food.calculatedCalories, 0)}
                </Text>
              </View>
            ))}

            {meal.description && (
              <>
                <View style={styles.separator} />

                <Text style={[styles.subHeader]}>Information</Text>
                <View style={[styles.descriptionWrapper]}>
                  <Text style={styles.textMargin}>{meal.description}</Text>
                </View>
              </>
            )}
          </Page>
        </React.Fragment>
      ))}
    </Document>
  );
};
