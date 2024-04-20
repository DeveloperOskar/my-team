"use client";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  Font,
  View,
} from "@react-pdf/renderer";
import { CoachingMealPlanData } from "./useCoachingMealPlanState";
import { getMealPlanTotals } from "./helpers";
import { showDecimalIfNotZero } from "@/lib/utils";

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
      marginTop: 15,
      marginBottom: 15,
      borderBottom: 2,
      borderColor: "#BDBDBD",
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
      fontSize: 14,
      textTransform: "uppercase",
      fontWeight: 600,
    },
    tableData: {
      fontSize: 14,
    },
  });

  return (
    <Document>
      <Page style={styles.page} size="A4">
        <Text style={styles.mainHeader}>{data.name}</Text>

        <View style={styles.separator} />

        {data.includeAuthor ||
        data.selectedClient ||
        data.startDate ||
        data.endDate ? (
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
                  <Text style={[styles.semiBold]}>Slutdatum:</Text>{" "}
                  {data.endDate}
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
                  <Text style={[styles.semiBold]}>Coach:</Text>{" "}
                  {data.authorName}
                </Text>
              )}
            </View>
            <View style={styles.separator} />
          </>
        ) : null}

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
        <Page style={styles.page} size="A4" key={index}>
          <Text style={styles.mainHeader}>{meal.name}</Text>
          <View style={styles.separator} />

          <Text style={styles.subHeader}>Totalt</Text>

          <View style={styles.mealWrapper}>
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
              {showDecimalIfNotZero(getMealPlanTotals(data.meals).calories)} g
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
                  flexGrow: 1,
                },
              ]}
            >
              Namn
            </Text>
            <Text
              style={[
                styles.tableHeader,
                {
                  flexGrow: 1,
                },
              ]}
            >
              Mängd
            </Text>
            <Text
              style={[
                styles.tableHeader,
                {
                  flexGrow: 1,
                },
              ]}
            >
              Protein
            </Text>
            <Text
              style={[
                styles.tableHeader,
                {
                  flexGrow: 1,
                },
              ]}
            >
              Kolhydrater
            </Text>
            <Text
              style={[
                styles.tableHeader,
                {
                  flexGrow: 1,
                },
              ]}
            >
              Fett
            </Text>
            <Text
              style={[
                styles.tableHeader,
                {
                  flexGrow: 1,
                },
              ]}
            >
              Kalorier
            </Text>
          </View>

          {meal.foods.map((food, i) => (
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
                  styles.tableData,
                  {
                    flexGrow: 1,
                  },
                ]}
              >
                {food.name}
              </Text>
              <Text
                style={[
                  styles.tableData,
                  {
                    flexGrow: 1,
                  },
                ]}
              >
                {food.calculatedAmount}
              </Text>
              <Text
                style={[
                  styles.tableData,
                  {
                    flexGrow: 1,
                  },
                ]}
              >
                {food.calculatedProtein}
              </Text>
              <Text
                style={[
                  styles.tableData,
                  {
                    flexGrow: 1,
                  },
                ]}
              >
                {food.calculatedCarbs}
              </Text>
              <Text
                style={[
                  styles.tableData,
                  {
                    flexGrow: 1,
                  },
                ]}
              >
                {food.calculatedFat}
              </Text>
              <Text
                style={[
                  styles.tableData,
                  {
                    flexGrow: 1,
                  },
                ]}
              >
                {food.calculatedCalories}
              </Text>
            </View>
          ))}

          {meal.description && (
            <>
              <Text style={[styles.subHeader, { marginTop: 15 }]}>
                Information
              </Text>
              <View style={[styles.descriptionWrapper]}>
                <Text style={styles.textMargin}>{meal.description}</Text>
              </View>
            </>
          )}
        </Page>
      ))}
    </Document>
  );
};
