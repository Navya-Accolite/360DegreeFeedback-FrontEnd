import React from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet,TextArea } from "@react-pdf/renderer";

// const styles = StyleSheet.create({
//     page: {
//       flexDirection: "row",
//       backgroundColor: "#E4E4E4"
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1
//     }
//   });

  const styles = StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: 12,
      paddingTop: 30,
      paddingLeft: 60,
      paddingRight: 60,
      paddingBottom: 30,
    },
    table: {
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      flexDirection: 'row',
    },
    tableCell: {
      width: '12.5%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    headerText: {
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: '#302b63',
      padding: 6,
    },
  });



function Pdf(props) {


  return (
    <div>
    <PDFDownloadLink
      document={
       
        <Document>
        <Page style={styles.page}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              {/* <View style={styles.tableCell} />
              <View style={styles.tableCell} />
              <View style={styles.tableCell} />
              <View style={styles.tableCell} /> */}
              <View style={styles.tableCell}>
                <Text style={styles.headerText}>Performance Parameters</Text>
              </View>
              {props.question.map(attribute => (
            <View style={styles.tableCell} key={attribute.attributeId}>
              <Text style={styles.headerText}>{attribute.attribute}</Text>
            </View>
          ))}
            </View>
            {props.data.map((feedback, index) => (
              <View style={styles.tableRow} key={index}>
                <View style={styles.tableCell}>
                  <Text>{feedback.projectName}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{feedback.feedbackProvider}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{feedback.startDate}</Text>
                </View>
                <View style={styles.tableCell}>
                  <Text>{feedback.endDate}</Text>
                </View>
                <View style={styles.tableCell}>
                 <Text>{feedback.selfInput}</Text>
                 
                </View>
                <View style={styles.tableCell}>
                 {/* <Text>{feedback.feedbackComment}</Text> */}
                </View>
                {props.question.map(attribute => (
              <View style={styles.tableCell} key={attribute.attributeId}>
                <Text>{feedback[attribute.attribute] || '-'}</Text>
              </View>
            ))}
                
              </View>
            ))}
          </View>
        </Page>
      </Document>



      }
      fileName="FeedbackReport.pdf"
      style={{
        textDecoration: "none",
        padding: "10px",
        color: "#4a4a4a",
        backgroundColor: "#f2f2f2",
        border: "1px solid #4a4a4a",
        display:"flex",
        flexDirection:"column",
      }}
    />
      
    </div>
  )
}

export default Pdf
