from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import logging

logger = logging.getLogger('core')

class FrontendLogView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        log_data = request.data.get('log', '')
        level = request.data.get('level', 'info').lower()

        if level == 'debug':
            logger.debug(log_data)
        elif level == 'warning':
            logger.warning(log_data)
        elif level == 'error':
            logger.error(log_data)
        else:
            logger.info(log_data)

        return Response({"status": "logged"})
