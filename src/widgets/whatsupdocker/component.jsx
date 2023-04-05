import { useTranslation } from "next-i18next";

import Container from "components/services/widget/container";
import Block from "components/services/widget/block";
import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();

  const { widget } = service;

  const { data: containersData, error: containersError } = useWidgetAPI(widget, "whatsupdocker");

  if (containersError) {
    return <Container error={containersError} />;
  }

  if (!containersData) {
    return (
      <Container service={service}>
        <Block label="whatsupdocker.updates_available" />
        <Block label="whatsupdocker.watched_containers" />
      </Container>
    );
  }

  return (
    <Container service={service}>
      <Block label="whatsupdocker.updates_available" value={t("common.number", { value: containersData.updates })} />
      <Block label="whatsupdocker.watched_containers" value={t("common.number", { value: containersData.total })} />
    </Container>
  );
}
