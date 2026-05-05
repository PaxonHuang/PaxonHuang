---
slug: deep-learning-optimization
title: 'Optimization Algorithms in Deep Learning'
date: '2026-03-22'
category: AI
tags: ["Machine Learning", "Mathematics", "Python"]
excerpt: 'An overview of optimization techniques from standard SGD to Adam, and their mathematical formulations.'
---

# Optimization Algorithms in Deep Learning

Optimization is the core of training any neural network. We aim to minimize the loss function $J(\theta)$.

## Gradient Descent

The standard parameter update step:

$$ \theta = \theta - \eta \nabla_\theta J(\theta; x^{(i)}, y^{(i)}) $$

## Adam Optimizer

Adam (Adaptive Moment Estimation) combines the advantages of AdaGrad and RMSProp. 

Let $m_t$ be the first moment (mean) and $v_t$ the second moment (uncentered variance):

$$ m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t $$
$$ v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2 $$

To correct the bias towards zero:

$$ \hat{m}_t = \frac{m_t}{1 - \beta_1^t} $$
$$ \hat{v}_t = \frac{v_t}{1 - \beta_2^t} $$

Finally, update the parameters:

$$ \theta_{t+1} = \theta_t - \frac{\eta}{\sqrt{\hat{v}_t} + \epsilon} \hat{m}_t $$

```python
import torch

# Standard optimization block in PyTorch
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)

optimizer.zero_grad()
loss = criterion(outputs, targets)
loss.backward()
optimizer.step()
```
