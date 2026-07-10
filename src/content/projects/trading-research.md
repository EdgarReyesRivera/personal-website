---
title: 'Trading Strategy Research System'
description: 'A Python research system with an anti-lookahead backtest engine and walk-forward validation that tested 3 classical strategies across 25 tickers — and produced a null result rigorous enough to trust.'
status: 'Completed'
pubDate: 2026-07-07
tags: ['Python', 'pandas', 'SQLite', 'Statistics', 'Quantitative Research', 'Data Pipelines']
featured: true
---

## Overview

I built a trading research system in Python to answer one question with statistical honesty: do classical technical trading strategies still carry real edge on liquid US assets? The system downloads and validates sixteen years of daily market data, backtests strategies through an engine designed to make self-deception structurally difficult, selects parameters with walk-forward analysis, and forwards the surviving pipeline into a live paper-trading account. After testing three classical strategies across 25 tickers over roughly thirteen out-of-sample years, the answer was no — nothing beat buy-and-hold — and the system's real product is that this null result can be trusted.

## How It Works

The pipeline has four stages. A data layer pulls daily bars for 25 tickers (ten major ETFs and fifteen mega-cap stocks) from 2010 to the present into SQLite, storing raw and adjusted prices side by side; ingest validation flags missing values, impossible prices, and calendar gaps, and reports problems rather than silently repairing them.

The backtest engine treats a strategy as a plain function returning a desired position — long or cash — per day. A signal formed at day *t*'s close can only fill at day *t+1*'s open, transaction costs are charged on every fill by default, and every run is stored beside a buy-and-hold benchmark on the same ticker and period.

Walk-forward validation then handles parameter selection the only honest way: rolling three-year train / one-year test windows stepped a year at a time, with parameters chosen on the train window alone and evaluated once on the unseen test year. There is deliberately no API that lets a caller label arbitrary numbers "out of sample."

Finally, a paper-trading loop runs one decision per weekday evening on a systemd timer, mirroring the backtest contract exactly: signal on the latest completed session's close, whole-share market-on-open order in the next opening auction, placed against Alpaca's paper API.

## Technical Challenges

**Making the backtest unable to flatter.** Backtests fail toward optimism, so the engine verifies rather than trusts. Before every run, each strategy is re-executed on truncated copies of its history; if any past signal changes when future data is removed, the run is refused — which reliably catches the classic accidents like negative shifts and full-sample normalization.

**Statistical honesty at scale.** Three strategies times 25 tickers is 75 comparisons, so about four should clear the 5% significance bar by luck alone. The reporting discounts isolated green lights, checks whether headline numbers come from one lucky fold, and treats its sign-test p-values as optimistic because adjacent folds share training years and the tickers are correlated.

**Paper-only by construction.** No code path in the repository can place a real-money order. The single broker module hardcodes Alpaca's paper mode at its only client construction site, refuses any credential that doesn't carry the paper-key prefix, and asserts the endpoint is the paper API before any request.

**Operational safety.** The daily loop has a kill-switch file, a freshness rule that refuses to trade a stale decision after missed runs, and an order-size cap that rejects rather than clips; every run, skip, and order attempt is logged and emailed.

## Results

The headline is a rigorous null: zero of 75 sign tests were significant at p = 0.05, and mean excess return over buy-and-hold was negative for every strategy/ticker combination at realistic transaction costs. The trend-following strategies did cut maximum drawdown on most ETFs, but paid for it in return. This is the expected outcome for signals that have been published for decades on the world's most liquid assets — a process that "found" a winner here would more likely be reporting a leak or luck. The engine itself earns trust separately: buy-and-hold pushed through the full machinery reproduces SPY's known total return since 2010, a 66-test suite checks it against hand-computed math, and the full 75-combination sweep runs in about 15 seconds. The pipeline has been live against the paper API since July 2026, running buy-and-hold SPY — proving the infrastructure end to end, since no strategy earned deployment.

## Future Work

The validation machinery is strategy-agnostic, so the natural next step is testing ideas outside the long-arbitraged classics — cross-sectional and multi-asset approaches — plugged into the same walk-forward harness, along with a survivorship-free universe to replace the hindsight-picked stock list.
