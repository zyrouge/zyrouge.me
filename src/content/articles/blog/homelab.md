---
title: Preparing my Homelab!
description: About my homelab configuration and the services I run on it.
category: blog
tags: [homelab]
time: 2025-03-23T11:49:20.107Z
keywords:
    - homelab setup
    - self-hosted tools
    - diy homelab
---

# Motive

I've been experimenting with VPS for a while now. While it was adequate for my needs, I hated the slow performance and the high cost to keep it running. So, I made a homelab like any sane tech person would do!

# Hardware

My homelab server is a ~$200 N100 Mini PC from MSI with 16GB RAM and 256GB M.2 NVMe. Even though I set up a homelab server, I still needed a cloud server to access it remotely. For that, I'm renting a 1 vCPU, 2 GB RAM, and 20 GB HDD shared server from OVHcloud. I'm considering something cheaper like the $1 Netcup Piko, I'll update this post if I do!

# Software

So, what am I currently hosting? I'll explain them by their purpose and why I chose them.

## Fedora Server (Operating System)

Why Fedora over Ubuntu? Personally, Ubuntu is just too slow with updates. And personally, I feel like it's a bit bloated (😭). Fedora is well-tested and is faster with updates. Also, applications such as Podman and Cockpit are baked in or easily bakeable (did it on purpose).

## Cockpit (Administration)

I don't really use [Cockpit](https://cockpit-project.org/) much, but it could be handy to check for system updates, check logs, check running services, run commands without SSH, and such. It comes bundled with Fedora Server and is too good to be removed.

## Podman (Containerization)

All the services are run using [Podman](https://podman.io/). Instead of [Docker Compose](https://docs.docker.com/compose), I used [Podlets](https://github.com/containers/podlet) which integrates with systemd services. I highly recommend this combination since they are completely rootless and are super easy to deploy.

## Headscale + Tailscale (Tunneling)

[Headscale](https://headscale.net) runs on the cloud server, and [Tailscale](https://tailscale.com) runs on my homelab server. This allows me to access my homelab server through tunnels securely without exposing it to the internet. It also makes implementing DDNS unnecessary (nobody should honestly do this, unless you have some guts).

## FRP (Tunneling)

[FRP](https://github.com/fatedier/frp) runs on both servers to expose specific ports for communication with each other. This also acts as my backup tunnel in case Headscale/Tailscale fails. Think of it as an added layer of redundancy.

## Caddy (Reverse Proxy)

[Caddy](https://caddyserver.com) runs on both the servers to handle incoming traffic on ports 80 and 443. Absolutely, one of my favorite tools. Handles SSL automatically for both public and internal use which is really essential for security.

## Glance (Homepage)

[Glance](https://github.com/glanceapp/glance) runs on both the servers to display links of all running services. It is customizable to an extent and looks beautiful.

## Dufs (Storage)

[Dufs](https://github.com/sigoden/dufs) runs on the cloud server that I can use to temporarily store files. It has minimal authentication and is dead simple. I primarily use it to share small files between devices. Not fancy, but it's perfect.

## Beszel (Monitoring)

[Beszel](https://beszel.dev) runs on the cloud server to gather metrics about the system and the Podman containers. It is really lightweight and does what it says.

## Grafana (Metrics Visualizer)

[Grafana](https://grafana.com) runs on my homelab server. It provided a really good way to visualize metrics. It also handles alerting when a service goes down. This is the way to go if you need something really powerful.

## Prometheus (Monitoring)

[Prometheus](https://prometheus.io/) runs on my homelab server to gather metrics from all the services. It is added as a data source in [Grafana](#grafana-metrics-visualizer).

## Postgres (Database)

[Postgres](https://www.postgresql.org) is used for all the services that require a database. Each service has its own dedicated database server running.

## Authelia (Authentication)

[Authelia](https://www.authelia.com) runs on my homelab to provide authentication to all my homelab services. It is a little hard to set up but gets easier over time. Provides SSO so most of my services can replace it's authentication using Forward Auth or OpenID Connect.

## Forgejo (Repositories)

[Forgejo](https://forgejo.org) runs on my homelab server to mirror my important Github repositories. Tried to set up CI/CD through [Forgejo Runner](https://code.forgejo.org/forgejo/runner) and Podman-in-Podman, but it's been a bit more challenging than I expected. Still, I'm committed to getting this set up in the near future.

## FireflyIII (Finance Tracking)

[FireflyIII](https://www.firefly-iii.org) runs on my homelab server. Tracks literally every single expense I do. I literally use it every single day and cannot live without this. Must have if you want to fix your spends!

## Memos (Note-taking)

[Memos](https://www.usememos.com) runs on my homelab server. I currently use it for journaling instead of note-taking, as it's better that way. It has the best markdown visualization and includes features such as tags. Your journey needs more appreciation!

## NocoDB (Low-code Database)

[NocoDB](https://nocodb.com/) runs on my homelab server. I rarely use this since I have not found a solid purpose. Might replace this with something else due to no support for OpenID Connect in the community edition.

# Conclusion

Other than that, I run personally made services such as [Tofu Discord Bot](https://github.com/zyrouge/tofu), website proxy (🏴‍☠️), etc. I'm still looking for new things to self-host and self-hostable alternatives to [FileRun](https://filerun.com), [Obsidian](https://obsidian.md) and [NocoDB](nocodb.com). I'll update this post once I find them!
