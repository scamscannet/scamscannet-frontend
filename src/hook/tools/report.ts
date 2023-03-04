import {abuseData, abuseStatus, reportData, reportsList, reportStatus} from "../../store/tools/report";
import {CLIENTS, makeApiRequest} from "../../lib/client/request";
import {APIS, PATHS} from "../../lib/client/apis";

export const requestReportData = async (domain: String) => {
    reportStatus.set(-1);
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.blacklist,
        PATHS.blacklist.report.lookup + "/" + domain,
        {},
        {},
        false
    )
    if (response.error) {
        reportStatus.set(response.code === 404 ? 1 : -1);
    } else  {
        reportData.set(response.content);
        reportStatus.set(!response.content.completed ? 2 : response.content.scam ? 3 : 4);
    }


}

export const requestAbuseData = async (domain: String) => {
    abuseStatus.set(-1);
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.blacklist,
        PATHS.blacklist.abuse.lookup + "/" + domain,
        {},
        {},
        false
    )
    if (response.error) {
        abuseStatus.set(response.code === 404 ? 1 : -1);
    } else  {
        abuseData.set(response.content);
        abuseStatus.set(!response.content.completed ? 2 : response.content.blocked ? 3 : 4);
    }
}

export const requestAllReports = async () => {
    const response = await makeApiRequest(
        CLIENTS.GET,
        APIS.blacklist,
        PATHS.blacklist.report.all,
        {},
        {},
        false
    )
    if (!response.error) {
        reportsList.set(response.content.domains);
    }
}