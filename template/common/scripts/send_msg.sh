#!/bin/bash

set -eu
# TODO 此处需要修改为真实的群机器人 webhook_url
webhook_url="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxxxxxxxxxx"
# TODO 此处需要修改为真实的项目名称
project_name="xxxxx"
CI_COMMIT_SHORT_SHA=${CI_COMMIT_SHA:0:5}

curl ${webhook_url} \
   -H 'Content-Type: application/json' \
   -d "
   {
        \"msgtype\": \"markdown\",
        \"markdown\": {
            \"content\": \"${project_name}小程序体验版更新成功 \n> 环境:<font color=\\\"info\\\">${ENV}</font> \n> git地址:<font color=\\\"info\\\">[${CI_PROJECT_NAME}](${CI_PROJECT_URL})</font> \n> 分支:<font color=\\\"info\\\">${CI_BUILD_REF_NAME}</font> \n> commit:<font color=\\\"info\\\">${CI_COMMIT_SHORT_SHA}</font> \n> pipeline:<font color=\\\"info\\\">[查看详情](${CI_PIPELINE_URL})</font> \n> 更新者:<font color=\\\"info\\\">${GITLAB_USER_NAME}</font>\"
        }
   }"
