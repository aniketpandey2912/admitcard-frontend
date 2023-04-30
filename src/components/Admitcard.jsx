import React from "react";
import { Page, Text, Document, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  heading: { fontSize: "20px", fontWeight: "500", color: "green" },
  rows: {
    color: "white",
    display: "flex",
    columnGap: "20px",
    justifyContent: "space-between",
    padding: "5px",
  },
  page: {
    display: "flex",
    flexDirection: "column",
    rowGap: "10px",
    backgroundColor: "black",
    width: "40%",
    margin: "auto",
    padding: "20px",
  },
});

const Admitcard3 = ({ ...user }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.heading}>Vikalpa Test Admitcard</Text>
        <View style={styles.rows}>
          <Text>Name</Text>
          <Text>{user.name || "NA"}</Text>
        </View>
        <View style={styles.rows}>
          <Text>Roll No</Text>
          <Text>{user.roll_no || "NA"}</Text>
        </View>

        <View style={styles.rows}>
          <Text>Class</Text>
          <Text>{user.class || "NA"}</Text>
        </View>

        <View style={styles.rows}>
          <Text>School</Text>
          <Text>{user.school || "NA"}</Text>
        </View>

        <View style={styles.rows}>
          <Text>Phone</Text>
          <Text>{user.phone || "NA"}</Text>
        </View>
        <View style={styles.rows}>
          <Text>Address</Text>
          <Text>{user.address || "NA"}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default Admitcard3;
