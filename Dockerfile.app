FROM node:22

RUN apt-get update

RUN apt-get install -y locales && \
  sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
  dpkg-reconfigure --frontend=noninteractive locales

RUN apt-get install -y zsh tmux less

ENV NODE_OPTIONS=--enable-source-maps

CMD ["/bin/sleep", "infinity"]
