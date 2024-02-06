const excel = require('node-excel-export');
module.exports = {
  makeExcelFile: async function(aplyList){
    const styles = {
        headerDark: { 
            fill: { fgColor: { rgb: '55999999' } },
            font: { color: { rgb: 'FFFFFFFF' },
            sz: 14,
            bold: true,
            underline: true,
            alignment:{vertical:"center", horizontal:"center"},
            wrapText: true
          }
        },
        cellPink: {
          fill: { fgColor: { rgb: 'FFFFCCFF' } }
        },
        cellGreen: {
          fill: { fgColor: { rgb: 'FF00FF00' } }
        }
      };
    let campHeader = { // 헤더 역할을 합니다. 
        aplyDt: { displayName: '신청일',headerStyle: styles.headerDark, cellStyle: {}, width: 90 },
        aplyPrgrs: { displayName: '상태',headerStyle: styles.headerDark, cellStyle: {}, width: 60 },
        aplyName: { displayName: '신청자명',headerStyle: styles.headerDark, cellStyle: {}, width: 120 },
        jikbunSe: { displayName: '신청자직분', headerStyle: styles.headerDark, cellStyle: {}, width: 80 },
        church: { displayName: '교회명', headerStyle: styles.headerDark, cellStyle: {}, width: 120 },
        churchAdtr: { displayName: '목사님', headerStyle: styles.headerDark, cellStyle: {}, width: 80 },
        churchSe: { displayName: '교단', headerStyle: styles.headerDark, cellStyle: {}, width: 120 },
        churchAddr: { displayName: '교회주소', headerStyle: styles.headerDark, cellStyle: {}, width: 300 },
        churchDtlAddr: { displayName: '교회상세주소', headerStyle: styles.headerDark, cellStyle: {}, width: 120 },
        fullAddress: { displayName: '우편물주소', headerStyle: styles.headerDark, cellStyle: {}, width: 300 },
        detailAddress: { displayName: '우편물상세주소', headerStyle: styles.headerDark, cellStyle: {}, width: 120 },
        campCnt: { displayName: '캠프인원', headerStyle: styles.headerDark, cellStyle: {}, width: 250 },
        schdlSe: { displayName: '일정', headerStyle: styles.headerDark, cellStyle: {}, width: 50 },
        bankNm: { displayName: '은행', headerStyle: styles.headerDark, cellStyle: {}, width: 160 },
        pyrNm: { displayName: '입금자명', headerStyle: styles.headerDark, cellStyle: {}, width: 160 },
        phone: { displayName: '연락처', headerStyle: styles.headerDark, cellStyle: {}, width: 100 },
        email: { displayName: '이메일', headerStyle: styles.headerDark, cellStyle: {}, width: 200 },
        joinHisSe: { displayName: '참석여부', headerStyle: styles.headerDark, cellStyle: {}, width: 200 },
        joinPathSe: { displayName: '참여경로', headerStyle: styles.headerDark, cellStyle: {}, width: 200 },
        brochureCnt: { displayName: '브로셔', headerStyle: styles.headerDark, cellStyle: {}, width: 200 },
        posterCnt: { displayName: '포스터', headerStyle: styles.headerDark, cellStyle: {}, width: 200 },
        memo: { displayName: '기타의견 및 메모사항', headerStyle: styles.headerDark, cellStyle: {}, width: 200 },
    };
  
    for( idx in aplyList){
        var obj = aplyList[idx].campCnt;
        var strArr = []
        if(obj.chodeung){strArr.push('초등:'+obj.chodeung)}
        if(obj.cheongsonyeon){strArr.push('청소년:'+obj.cheongsonyeon)}
        if(obj.cheongnyeon){strArr.push('청년:'+obj.cheongnyeon)}
        if(obj.jangnyeon){strArr.push('장년:'+obj.jangnyeon)}
        if(obj.sayeogja){strArr.push('사역자:'+obj.sayeogja)}

        aplyList[idx].campCnt = strArr.join(',');
    }

    let exportData = [ 
      {
          name: '유스비전캠프신청등록리스트', // 시트 이름입니다. 
          specification: campHeader, // 위에서 만든 헤더들입니다.
          data: aplyList // 시트에 들어가는 데이터들입니다. 
      }
      /*
      ,{
        name: '두번채시트', 
        specification: monthlySpecification,
        data: monthlyDataSet 
      }
      */
    ];
    // exportData 역시 specification 처럼 for문을 통해 추가가능합니다. 
    let report = excel.buildExport(exportData);
    return report  
  }
}